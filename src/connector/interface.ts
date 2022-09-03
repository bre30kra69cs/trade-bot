import {Api, ApiID, Market, Orderbook} from '../api/interface';

export interface Connector {
  getApi: (apiID: ApiID) => Api;
  init: () => Promise<void>;
  getMarkets: () => Promise<Market[]>;
  getOrderbooks: (markets: Market[]) => Promise<Orderbook[]>;
}
