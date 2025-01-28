const winston = require('winston');

const logger = winston.createLogger({
  transports: [
    new winston.transports.File({
      filename: '../logs/application.log',
      format: winston.format.combine(
        winston.format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        winston.format.printf(({ timestamp, level, message, function: func }) => {
          return `${timestamp} [${level}]: ${message}${func ? ` [Function: ${func}]` : ''}`;
        })
      ),
    }),
  ],
});

module.exports = logger;
