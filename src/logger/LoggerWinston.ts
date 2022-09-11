import {injectable} from 'inversify';
import winston, {Logger as BaseLogger} from 'winston';

import {Logger} from './interface';

const {combine, timestamp, label, colorize, printf, prettyPrint} =
  winston.format;

@injectable()
export class LoggerWinston implements Logger {
  private logger: BaseLogger;

  constructor() {
    this.logger = winston.createLogger({
      format: combine(
        label({
          label: 'Trade Bot',
        }),
        timestamp({
          format: 'MMM-DD-YYYY HH:mm:ss',
        }),
        prettyPrint({
          colorize: true,
        }),
      ),
      transports: [new winston.transports.Console()],
    });
  }

  private format = printf(({level, message, label, timestamp}) => {
    return `${timestamp} [${label}] ${level}: ${JSON.stringify(
      message,
      undefined,
      2,
    )}`;
  });

  log = () => {
    this.logger.info('hello');
  };

  warn = () => {
    this.logger.warn('hello');
  };

  error = (error: Error | unknown) => {
    this.logger.error(error);
  };
}
