const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { blacklistToken } = require('../utils/blacklist');
const { generateTokenPair } = require('../utils/jwt');
const { ROLES, USER_ROLES } = require('../constants/roles');
const { PASSWORD_REQUIREMENTS, LOGIN_ATTEMPTS, TFA, PASSWORD_HISTORY } = require('../constants/security');
const { validatePassword, validatePasswordAgainstHistory } = require('../utils/passwordValidator');
const { logAuthenticationEvent } = require('../utils/auditLogger');
const { checkPasswordHistory, updatePasswordHistory } = require('../utils/passwordHistory');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;

// Register new user
exports.register = async (req, res) => {
  const { email, phone, password } = req.body;
  const role = ROLES.AUTHOR; // Default role for new users

  try {
    // Validate password requirements
    const passwordErrors = validatePassword(password);
    if (passwordErrors.length > 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'Password does not meet requirements',
        errors: passwordErrors
      });
    }

    // Validate role if provided (should be AUTHOR by default)
    if (req.body.role && !USER_ROLES.includes(req.body.role)) {
      return res.status(400).json({ 
        success: false, 
        message: `Invalid user role. Must be one of: ${USER_ROLES.join(', ')}`
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email already registered' 
      });
    }

    // Create new user with basic info
    const user = new User({
      email,
      phone,
      passwordHash: await bcrypt.hash(password, 10),
      role,
      isProfileComplete: false
    });

    await user.save();
    
    // Generate JWT tokens
    const { accessToken, refreshToken } = generateTokenPair(user._id, user.role);
    
    res.status(201).json({
      success: true,
      message: 'Registration successful. Please complete your profile.',
      accessToken,
      refreshToken
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during registration'
    });
  }
};

// Complete user profile
exports.completeProfile = async (req, res) => {
  const { userId } = req.user; // Get user ID from JWT
  const profileData = req.body;

  try {
    // Validate required fields
    const requiredFields = ['title', 'fullName', 'gender'];
    const missingFields = requiredFields.filter(field => !profileData[field]);
    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields',
        missing: missingFields
      });
    }

    // Validate ORCID format if provided
    if (profileData.orcid) {
      const orcidRegex = /^\d{4}-\d{4}-\d{4}-\d{3}[\dX]$/;
      if (!orcidRegex.test(profileData.orcid)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid ORCID format'
        });
      }
    }

    // Validate Scopus ID if provided
    if (profileData.scopusId) {
      const scopusRegex = /^\d{8}$/;
      if (!scopusRegex.test(profileData.scopusId)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid Scopus ID format'
        });
      }
    }

    // Validate ResearchGate URL if provided
    if (profileData.researchGate) {
      const urlRegex = /^(https?:\/\/)?(www\.)?researchgate\.net\/profile\/.+$/;
      if (!urlRegex.test(profileData.researchGate)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid ResearchGate URL format'
        });
      }
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Check if profile is already complete
    if (user.isProfileComplete) {
      return res.status(400).json({
        success: false,
        message: 'Profile is already complete'
      });
    }

    // Update user profile
    user.authorProfile = profileData;
    user.isProfileComplete = true;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Profile completed successfully'
    });
  } catch (error) {
    console.error('Profile completion error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during profile completion'
    });
  }
};

// Login user
exports.login = async (req, res) => {
  const { email, password, tfaCode } = req.body;
  const ipAddress = req.ip;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      // Log failed attempt
      logAuthenticationEvent('login_attempt', null, ipAddress, false, { reason: 'user_not_found' });
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid credentials' 
      });
    }

    // Check if account is locked
    if (user.loginAttempts && user.loginAttempts.lockedUntil) {
      const now = new Date();
      if (now < user.loginAttempts.lockedUntil) {
        const minutesLeft = Math.ceil((user.loginAttempts.lockedUntil - now) / (1000 * 60));
        return res.status(401).json({
          success: false,
          message: `Account is locked. Please try again in ${minutesLeft} minutes`
        });
      }
      // Reset login attempts after lockout period
      user.loginAttempts = { attempts: 0 };
    }

    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      // Increment failed attempts
      user.loginAttempts = user.loginAttempts || { attempts: 0 };
      user.loginAttempts.attempts += 1;
      
      // Check if account should be locked
      if (user.loginAttempts.attempts >= LOGIN_ATTEMPTS.MAX_ATTEMPTS) {
        const lockoutTime = new Date();
        lockoutTime.setMinutes(lockoutTime.getMinutes() + LOGIN_ATTEMPTS.LOCKOUT_TIME_MINUTES);
        user.loginAttempts.lockedUntil = lockoutTime;
      }
      
      await user.save();
      
      // Log failed attempt
      logAuthenticationEvent('login_attempt', user._id, ipAddress, false, { reason: 'invalid_password' });
      
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid credentials' 
      });
    }

    // Reset login attempts on successful login
    user.loginAttempts = { attempts: 0 };
    await user.save();

    // For roles requiring TFA, verify TFA code
    if (TFA.ENABLED && TFA.REQUIRED_ROLES.includes(user.role)) {
      if (!tfaCode) {
        return res.status(400).json({ 
          success: false, 
          message: 'TFA code is required for this role'
        });
      }
      // TODO: Implement TFA code verification
    }

    // Log successful login
    logAuthenticationEvent('login_success', user._id, ipAddress, true);

    const { accessToken, refreshToken } = generateTokenPair(user._id, user.role);
    
    res.json({ 
      success: true,
      accessToken,
      refreshToken,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        isProfileComplete: user.isProfileComplete
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Login failed',
      error: error.message 
    });
  }
};

exports.logout = async (req, res) => {
  const { token } = req.headers;
  const ipAddress = req.ip;
  const userId = req.user?.id;

  try {
    if (!token) {
      return res.status(400).json({ 
        success: false, 
        message: 'No token provided' 
      });
    }

    blacklistToken(token);
    
    // Also blacklist refresh token if provided
    if (req.body.refreshToken) {
      blacklistToken(req.body.refreshToken);
    }

    // Log logout event
    logAuthenticationEvent('logout', userId, ipAddress, true);

    res.json({ 
      success: true,
      message: 'Logged out successfully'
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Logout failed',
      error: error.message 
    });
  }
};

exports.getProfileStatus = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('isProfileComplete authorProfile');
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    res.json({ 
      success: true,
      isProfileComplete: user.isProfileComplete,
      authorProfile: user.authorProfile
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Failed to get profile status',
      error: error.message 
    });
  }
};

exports.updateAuthorProfile = async (req, res) => {
  try {
    const { authorProfile } = req.body;
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    const validationErrors = validateAuthorProfile(authorProfile);
    if (validationErrors.length > 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid profile data',
        errors: validationErrors
      });
    }

    user.authorProfile = authorProfile;
    user.isProfileComplete = true;
    await user.save();

    res.json({ 
      success: true,
      message: 'Profile updated successfully',
      profile: user.authorProfile
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Failed to update profile',
      error: error.message 
    });
  }
};

// Validate author profile fields
const validateAuthorProfile = (authorProfile) => {
  const requiredFields = [
    'personalInfo.fullName',
    'personalInfo.title',
    'personalInfo.gender',
    'personalInfo.dateOfBirth',
    'contactInfo.primaryEmail',
    'affiliation.currentPosition',
    'affiliation.institution',
    'affiliation.department',
    'affiliation.country',
    'affiliation.institutionalAddress',
    'academicInfo.degrees',
    'compliance.agreeToDiscloseConflicts',
    'compliance.willComplyWithEthics',
    'compliance.acceptJournalPolicies'
  ];

  const missingFields = requiredFields.filter(field => {
    const value = field.split('.').reduce((obj, prop) => obj && obj[prop], authorProfile);
    return !value;
  });

  return missingFields;
};

// ...

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiration = Date.now() + 3600000; // 1 hour

    // Update user with reset token
    user.passwordResetToken = resetToken;
    user.passwordResetExpires = resetTokenExpiration;
    await user.save();

    // Send reset email
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: true,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS
      }
    });

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: 'Password Reset Request',
      text: `You are receiving this email because you (or someone else) have requested the reset of the password for your account.
      Please click on the following link, or paste this into your browser to complete the process:
      ${resetUrl}

      If you did not request this, please ignore this email and your password will remain unchanged.

      This link will expire in 1 hour.`
    });

    res.status(200).json({ 
      success: true, 
      message: 'Password reset email sent' 
    });
  } catch (error) {
    console.error('Password reset error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error sending reset email' 
    });
  }
};

// ...

exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const user = await User.findOne({
      passwordResetToken: token,
      passwordResetExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid or expired reset token' 
      });
    }

    // Validate password requirements
    const passwordErrors = validatePassword(password);
    if (passwordErrors.length > 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'Password does not meet requirements',
        errors: passwordErrors
      });
    }

    // Check password history
    const canUsePassword = await checkPasswordHistory(user, password);
    if (!canUsePassword) {
      return res.status(400).json({ 
        success: false, 
        message: 'Cannot reuse recent passwords' 
      });
    }

    // Update password and clear reset token
    user.passwordHash = await bcrypt.hash(password, 10);
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await updatePasswordHistory(user, password);

    // Generate new tokens
    const { accessToken, refreshToken } = generateTokenPair(user._id, user.role);

    res.status(200).json({ 
      success: true, 
      message: 'Password reset successful',
      accessToken,
      refreshToken,
      user: {
        id: user._id,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Password reset error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error resetting password' 
    });
  }
};

// Export all functions
module.exports = {
  register,
  login,
  logout,
  getProfileStatus,
  validateAuthorProfile,
  updateAuthorProfile,
  forgotPassword,
  resetPassword
};
