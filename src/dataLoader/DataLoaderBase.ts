import {injectable, inject} from 'inversify';

import {Token} from '../di/Token';
import type {Connector} from '../connector/interface';
import type {Storage} from '../storage/interface';
import type {Market} from '../api/interface';
import type {DataLoader} from './interface';
import {invariant} from '../utils/invariant';

@injectable()
export class DataLoaderBase implements DataLoader {
  @inject(Token.Connector)
  private connector!: Connector;

  @inject(Token.Storage)
  private storage!: Storage;

  preload = async () => {
    const markets = await this.connector.getMarkets();
    await this.storage.set('markets', markets);
  };

  load = async () => {
    const markets = await this.storage.get<Market[]>('markets');
    invariant(markets?.length, 'No markets');
    const orderbooks = await this.connector.getOrderbooks(markets);

    return {
      markets,
      orderbooks,
    };
  };
}
