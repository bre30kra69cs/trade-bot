import {injectable} from 'inversify';
import pino, {BaseLogger} from 'pino';
import pinoPretty from 'pino-pretty';

import {Logger} from './interface';

@injectable()
export class LoggerPino implements Logger {
  private logger: BaseLogger;

  constructor() {
    this.logger = pino(
      pinoPretty({
        colorize: true,
      }),
    );
  }

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
