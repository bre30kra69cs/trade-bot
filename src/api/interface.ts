export type ApiID = 'Spin' | 'Tonic';

export type MarketTicker = `${string}/${string}`;

export interface OrderLimit {
  tokenAdress: string;
  marketId: string;
  size: string;
  price: string;
}

export interface OrderMarket {
  tokenAdress: string;
  marketId: string;
  size: string;
}

export interface Exchange {
  tokenAddress: string;
  amount: string;
}

export interface Market {
  apiID: ApiID;
  marketId: string;
  ticker: MarketTicker;
  baseAdress: string;
  quoteAdress: string;
  baseDecimal: number;
  quoteDecimal: number;
  origin: unknown;
}

interface OrderbookNode {
  price: string;
  quantity: string;
}

export interface Orderbook {
  apiID: ApiID;
  marketId: string;
  asks: OrderbookNode[];
  bids: OrderbookNode[];
  origin: unknown;
}

export interface Api {
  getID: () => ApiID;
  init: () => Promise<void>;
  getMarkets: () => Promise<Market[]>;
  getOrderbook: (marketId: string) => Promise<Orderbook>;
  placeAskMarket: (order: OrderMarket) => Promise<void>;
  placeAskLimit: (order: OrderLimit) => Promise<void>;
  placeBidMarket: (order: OrderMarket) => Promise<void>;
  placeBidLimit: (order: OrderLimit) => Promise<void>;
  withdraw: (exchange: Exchange) => Promise<void>;
  deposit: (exchange: Exchange) => Promise<void>;
}
