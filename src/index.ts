import { createCustomFormat } from './custom.format';
import { createLogger, format, transports } from 'winston';
import type { Logger, LoggerOptions } from 'winston';

const { combine, timestamp, label } = format;

function loggerFactory(
  baseAt?: string,
  labelIn?: string,
  options?: LoggerOptions
): Logger {
  const customFormat = createCustomFormat(baseAt ? baseAt : '');

  return createLogger({
    format: combine(label({ label: labelIn }), timestamp(), customFormat),
    defaultMeta: {
      at: baseAt,
    },
    transports: [
      new transports.Console({
        level: 'debug',
      }),
      new transports.File({
        level: 'info',
        format: format.json(),
        filename: 'logs/combined.log',
      }),
      new transports.File({
        level: 'error',
        format: format.json(),
        filename: 'logs/errors.log',
      }),
    ],
    ...options,
  });
}

export default loggerFactory;
