const winston = require('winston');
const { format } = winston;

const logger = winston.createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'logs/audit.log' }),
    new winston.transports.Console()
  ]
});

const logAuthenticationEvent = (event, userId, ipAddress, success, details = {}) => {
  const logData = {
    event,
    userId,
    ipAddress,
    success,
    timestamp: new Date().toISOString(),
    ...details
  };

  logger.info(logData);
};

module.exports = {
  logAuthenticationEvent
};
