const { PASSWORD_REQUIREMENTS } = require('../constants/security');
const zxcvbn = require('zxcvbn');

const validatePassword = (password) => {
  const errors = [];
  const requirements = PASSWORD_REQUIREMENTS.REQUIREMENTS;

  // Check length requirements
  if (password.length < PASSWORD_REQUIREMENTS.MIN_LENGTH) {
    errors.push(`Password must be at least ${PASSWORD_REQUIREMENTS.MIN_LENGTH} characters`);
  }
  if (password.length > PASSWORD_REQUIREMENTS.MAX_LENGTH) {
    errors.push(`Password cannot be longer than ${PASSWORD_REQUIREMENTS.MAX_LENGTH} characters`);
  }

  // Check character requirements
  if (requirements.uppercase && !/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  if (requirements.lowercase && !/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  if (requirements.numbers && !/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  if (requirements.specialChars && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }

  // Check unique characters
  const uniqueChars = new Set(password).size;
  if (uniqueChars < requirements.minUniqueChars) {
    errors.push(`Password must contain at least ${requirements.minUniqueChars} unique characters`);
  }

  // Check password strength
  const result = zxcvbn(password);
  if (result.score < 3) {
    errors.push('Password is too weak');
  }

  return errors;
};

const validatePasswordAgainstHistory = async (userId, password) => {
  const user = await User.findById(userId).select('passwordHistory');
  if (!user) return [];

  const errors = [];
  const history = user.passwordHistory || [];

  // Check against last N passwords
  for (let i = 0; i < Math.min(PASSWORD_HISTORY.MAX_HISTORY, history.length); i++) {
    const hashedPassword = history[i];
    const isMatch = await bcrypt.compare(password, hashedPassword);
    if (isMatch) {
      errors.push('Password cannot be the same as any of your last 5 passwords');
      break;
    }
  }

  return errors;
};

module.exports = {
  validatePassword,
  validatePasswordAgainstHistory
};
