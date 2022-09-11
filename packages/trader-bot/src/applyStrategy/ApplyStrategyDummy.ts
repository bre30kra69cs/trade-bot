import {injectable} from 'inversify';

import {Command} from '../thinkStrategy/interface';
import {ApplyStrategy} from './interface';

@injectable()
export class ApplyStrategyDummy implements ApplyStrategy {
  apply = async (commands: Command[]) => {
    for (const command of commands) {
      await command.run();
    }
  };
}
