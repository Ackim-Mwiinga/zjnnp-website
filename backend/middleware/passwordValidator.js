const validatePassword = (password) => {
  const errors = [];
  
  // Minimum length
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  
  // Maximum length
  if (password.length > 72) {
    errors.push('Password must be no longer than 72 characters');
  }
  
  // Must contain uppercase letter
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  // Must contain lowercase letter
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  // Must contain number
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  // Must contain special character
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }
  
  return errors;
};

const checkPasswordHistory = async (userId, password) => {
  const user = await User.findById(userId);
  if (!user) return false;
  
  // Check if password matches any in history
  const matches = user.passwordHistory.some(async (hash) => {
    return await bcrypt.compare(password, hash);
  });
  
  return matches;
};

module.exports = {
  validatePassword,
  checkPasswordHistory
};
