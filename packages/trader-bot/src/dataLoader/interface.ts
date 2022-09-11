import {Market, Orderbook} from '../api/interface';

export interface Data {
  markets?: Market[];
  orderbooks?: Orderbook[];
}

export interface DataLoader {
  preload?: () => Promise<void>;
  load: () => Promise<Data>;
}
