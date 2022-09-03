import {injectable} from 'inversify';

import {Logger} from './interface';

@injectable()
export class LoggerBase implements Logger {
  log = () => {
    console.log('hello');
  };

  warn = () => {
    console.warn('hello');
  };
}
