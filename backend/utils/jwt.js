const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

const generateAccessToken = (userId, role) => {
  return jwt.sign(
    { userId, role },
    process.env.JWT_SECRET,
    { 
      expiresIn: '15m', // Access token expires in 15 minutes
      jwtid: uuidv4() // Unique identifier for token revocation
    }
  );
};

const generateRefreshToken = (userId, role) => {
  return jwt.sign(
    { userId, role },
    process.env.JWT_REFRESH_SECRET,
    { 
      expiresIn: '7d', // Refresh token expires in 7 days
      jwtid: uuidv4()
    }
  );
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return { expired: true };
    }
    return null;
  }
};

const verifyRefreshToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return { expired: true };
    }
    return null;
  }
};

const generateTokenPair = (userId, role) => {
  return {
    accessToken: generateAccessToken(userId, role),
    refreshToken: generateRefreshToken(userId, role)
  };
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
  verifyRefreshToken,
  generateTokenPair
};
