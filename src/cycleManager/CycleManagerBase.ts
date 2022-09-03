import {injectable, inject} from 'inversify';

import {Token} from '../di/Token';
import type {Logger} from '../logger/interface';
import type {DataLoader} from '../dataLoader/interface';
import type {ThinkStrategy} from '../thinkStrategy/interface';
import type {ApplyStrategy} from '../applyStrategy/interface';
import type {CycleManager} from './interface';

type CycleManagerBaseConfig = {
  interval: number;
};

const createCycleManagerBase = (config: CycleManagerBaseConfig) => {
  @injectable()
  class CycleManagerBase implements CycleManager {
    @inject(Token.Logger)
    private logger!: Logger;

    @inject(Token.DataLoader)
    private dataLoader!: DataLoader;

    @inject(Token.ThinkStrategy)
    private thinkStrategy!: ThinkStrategy;

    @inject(Token.ApplyStrategy)
    private applyStrategy!: ApplyStrategy;

    private running = false;

    private timeoutId?: NodeJS.Timer;

    private iteration = () => {
      clearInterval(this.timeoutId);

      this.timeoutId = setTimeout(async () => {
        const data = await this.dataLoader.load();
        const commands = await this.thinkStrategy.think(data);
        await this.applyStrategy.apply(commands);
        this.iteration();
      }, config.interval);
    };

    start = async () => {
      if (this.running) {
        this.logger.warn('Cycle already running');
        return;
      }

      this.running = true;
      await this.dataLoader.preload?.();
      this.iteration();
    };

    stop = async () => {
      if (!this.running) {
        this.logger.warn('Cycle already stopped');
        return;
      }

      this.running = false;
      clearTimeout(this.timeoutId);
    };
  }

  return CycleManagerBase;
};

export const CycleManagerBase = createCycleManagerBase({
  interval: 1000,
});
