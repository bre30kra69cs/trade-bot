import {Data} from '../dataLoader/interface';

export type Command = {
  type:
    | 'placeAsk'
    | 'placeBid'
    | 'cancelOrder'
    | 'cancelOrders'
    | 'deposit'
    | 'withdraw';
  run: () => Promise<void>;
};

export interface ThinkStrategy {
  think: (data: Data) => Promise<Command[]>;
}
