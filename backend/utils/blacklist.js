// utils/blacklist.js
const tokenBlacklist = new Set();

function blacklistToken(token) {
  tokenBlacklist.add(token);
}

function isTokenBlacklisted(token) {
  return tokenBlacklist.has(token);
}

module.exports = { blacklistToken, isTokenBlacklisted };
