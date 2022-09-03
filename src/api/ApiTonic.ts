import * as nearApi from 'near-api-js';
import {Tonic} from '@tonic-foundation/tonic';
import {MarketViewV1} from '@tonic-foundation/tonic/lib/types/v1';

import {
  Api,
  ApiID,
  Market,
  MarketTicker,
  OrderLimit,
  OrderMarket,
  Orderbook,
  Exchange,
} from './interface';

const NEAR_CONFIG: nearApi.ConnectConfig = {
  networkId: 'testnet',
  nodeUrl: 'https://rpc.testnet.near.org',
  walletUrl: 'https://wallet.testnet.near.org',
  helperUrl: 'https://helper.testnet.near.org',
  headers: {},
};

export class ApiTonic implements Api {
  private api!: Tonic;

  private parseTicker = (market: MarketViewV1): MarketTicker => {
    const base = market.base_token.token_type;

    const baseSymbol =
      base.type === 'near'
        ? 'NEAR'
        : base.account_id.split('.')[0].toUpperCase();

    const quote = market.quote_token.token_type;

    const quoteSymbol =
      quote.type === 'near'
        ? 'NEAR'
        : quote.account_id.split('.')[0].toUpperCase();

    return `${baseSymbol}/${quoteSymbol}`;
  };

  getID = (): ApiID => {
    return 'Tonic';
  };

  init = async () => {
    const keyPair = nearApi.KeyPair.fromString(process.env.NEAR_PRIVATE_KEY);
    const keyStore = new nearApi.keyStores.InMemoryKeyStore();

    await keyStore.setKey(
      NEAR_CONFIG.networkId,
      process.env.NEAR_ACCOUNT_ID,
      keyPair,
    );

    const near = new nearApi.Near({
      ...NEAR_CONFIG,
      keyStore,
    });

    const account = await near.account(process.env.NEAR_ACCOUNT_ID);
    this.api = new Tonic(account, process.env.NEAR_TONIC_CONTRACT_ID);
  };

  getMarkets = async (): Promise<Market[]> => {
    const response = await this.api.listMarkets();

    return response.map((market) => {
      return {
        apiID: this.getID(),
        marketId: market.id,
        ticker: this.parseTicker(market),
        baseAdress: market.base_token.token_type.type,
        quoteAdress: market.quote_token.token_type.type,
        baseDecimal: market.base_token.decimals,
        quoteDecimal: market.quote_token.decimals,
        origin: market,
      };
    });
  };

  getOrderbook = async (marketId: string): Promise<Orderbook> => {
    const response = await this.api.getOrderbook(marketId);

    return {
      apiID: this.getID(),
      marketId,
      asks:
        response.asks.map((ask) => {
          return {
            price: ask[0].toString(),
            quantity: ask[1].toString(),
          };
        }) ?? [],
      bids:
        response.bids.map((ask) => {
          return {
            price: ask[0].toString(),
            quantity: ask[1].toString(),
          };
        }) ?? [],
      origin: response,
    };
  };

  placeAskMarket = async (order: OrderMarket) => {
    await this.api.placeOrder(order.marketId, {
      side: 'Sell',
      order_type: 'Market',
      quantity: order.size,
      limit_price: '0',
      client_id: null,
    });
  };

  placeAskLimit = async (order: OrderLimit) => {
    await this.api.placeOrder(order.marketId, {
      side: 'Sell',
      order_type: 'Limit',
      quantity: order.size,
      limit_price: order.price,
      client_id: null,
    });
  };

  placeBidMarket = async (order: OrderMarket) => {
    await this.api.placeOrder(order.marketId, {
      side: 'Buy',
      order_type: 'Market',
      quantity: order.size,
      limit_price: '0',
      client_id: null,
    });
  };

  placeBidLimit = async (order: OrderLimit) => {
    await this.api.placeOrder(order.marketId, {
      side: 'Buy',
      order_type: 'Limit',
      quantity: order.size,
      limit_price: order.price,
      client_id: null,
    });
  };

  withdraw = async (exchange: Exchange) => {
    console.log(exchange);
  };

  deposit = async (exchange: Exchange) => {
    console.log(exchange);
  };
}
