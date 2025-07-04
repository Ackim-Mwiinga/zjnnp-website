const PASSWORD_REQUIREMENTS = {
  MIN_LENGTH: 12,
  MAX_LENGTH: 64,
  REQUIREMENTS: {
    uppercase: true,
    lowercase: true,
    numbers: true,
    specialChars: true,
    minUniqueChars: 6
  }
};

const LOGIN_ATTEMPTS = {
  MAX_ATTEMPTS: 5,
  LOCKOUT_TIME_MINUTES: 15,
  TIME_WINDOW_MINUTES: 15
};

const PASSWORD_HISTORY = {
  MAX_HISTORY: 5,
  TIME_WINDOW_DAYS: 90
};

const TFA = {
  ENABLED: true,
  REQUIRED_ROLES: ['admin', 'editor'],
  CODE_LENGTH: 6,
  EXPIRY_MINUTES: 15
};

module.exports = {
  PASSWORD_REQUIREMENTS,
  LOGIN_ATTEMPTS,
  PASSWORD_HISTORY,
  TFA
};
