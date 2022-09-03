import {injectable, inject} from 'inversify';

import {Token} from '../di/Token';
import type {CycleManager} from '../cycleManager/interface';
import type {Connector} from '../connector/interface';
import type {App} from './interface';

@injectable()
export class AppRoot implements App {
  @inject(Token.CycleManager)
  private cycleManager!: CycleManager;

  @inject(Token.Connector)
  private connector!: Connector;

  run = async () => {
    await this.connector.init();
    await this.cycleManager.start();
  };

  kill = async () => {
    await this.cycleManager.stop();
  };
}
