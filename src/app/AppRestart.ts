import {injectable, inject} from 'inversify';

import {Token} from '../di/Token';
import type {CycleManager} from '../cycleManager/interface';
import type {Connector} from '../connector/interface';
import type {Logger} from '../logger/interface';
import type {App} from './interface';

@injectable()
export class AppRestart implements App {
  @inject(Token.Logger)
  private logger!: Logger;

  @inject(Token.CycleManager)
  private cycleManager!: CycleManager;

  @inject(Token.Connector)
  private connector!: Connector;

  run = async () => {
    await this.connector.init();

    try {
      await this.cycleManager.start();
    } catch (error) {
      this.logger.error(error);
      await this.kill();
      await this.run();
    }
  };

  kill = async () => {
    try {
      await this.cycleManager.stop();
    } catch (error) {
      this.logger.error(error);
    }
  };
}
