const MAX_LOGIN_ATTEMPTS = 5;
const LOCKOUT_DURATION = 30 * 60 * 1000; // 30 minutes

const accountLockout = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return next();
    }

    // Check if account is locked
    if (user.loginAttempts.lockedUntil && user.loginAttempts.lockedUntil > Date.now()) {
      const remainingTime = Math.ceil((user.loginAttempts.lockedUntil - Date.now()) / 1000);
      return res.status(423).json({
        message: 'Account locked due to too many failed login attempts',
        remainingTime
      });
    }

    // If no lockout, continue to next middleware
    next();
  } catch (error) {
    next(error);
  }
};

const updateLoginAttempts = async (email, success) => {
  try {
    const user = await User.findOne({ email });
    if (!user) return;

    if (success) {
      // Reset login attempts on successful login
      user.loginAttempts = {
        count: 0,
        lockedUntil: null
      };
      user.lastLogin = new Date();
    } else {
      // Increment failed attempts
      user.loginAttempts.count += 1;
      user.lastFailedLogin = new Date();

      // If too many failed attempts, lock account
      if (user.loginAttempts.count >= MAX_LOGIN_ATTEMPTS) {
        user.loginAttempts.lockedUntil = new Date(Date.now() + LOCKOUT_DURATION);
      }
    }

    await user.save();
  } catch (error) {
    console.error('Error updating login attempts:', error);
  }
};

module.exports = {
  accountLockout,
  updateLoginAttempts
};
