import {Command} from '../thinkStrategy/interface';

export interface ApplyStrategy {
  apply: (commands: Command[]) => Promise<void>;
}
