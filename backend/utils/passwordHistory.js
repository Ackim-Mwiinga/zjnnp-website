const bcrypt = require('bcryptjs');

const checkPasswordHistory = async (user, newPassword) => {
  if (!user.passwordHistory) return true;
  
  // Check against last 5 passwords
  const recentPasswords = user.passwordHistory.slice(-5);
  
  for (const oldPassword of recentPasswords) {
    const isMatch = await bcrypt.compare(newPassword, oldPassword);
    if (isMatch) {
      return false;
    }
  }
  
  return true;
};

const updatePasswordHistory = async (user, newPassword) => {
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  
  // Keep only last 5 passwords
  if (user.passwordHistory && user.passwordHistory.length >= 5) {
    user.passwordHistory = user.passwordHistory.slice(-4);
  }
  
  if (!user.passwordHistory) {
    user.passwordHistory = [];
  }
  
  user.passwordHistory.push(hashedPassword);
  return user.save();
};

module.exports = {
  checkPasswordHistory,
  updatePasswordHistory
};
