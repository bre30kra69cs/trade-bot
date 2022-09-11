import {createSpotApi, SpotApi} from '@spinfi/node';

import {
  Api,
  ApiID,
  Market,
  OrderLimit,
  OrderMarket,
  Orderbook,
  Exchange,
} from './interface';

export class ApiSpin implements Api {
  private api!: SpotApi;

  getID = (): ApiID => {
    return 'Spin';
  };

  init = async () => {
    this.api = await createSpotApi({
      privateKey: process.env.NEAR_PRIVATE_KEY,
      accountId: process.env.NEAR_ACCOUNT_ID,
      contractId: process.env.NEAR_SPIN_CONTRACT_ID,
    });
  };

  getMarkets = async (): Promise<Market[]> => {
    const response = await this.api.spin.getMarkets();

    return response.map((market) => {
      return {
        apiID: this.getID(),
        marketId: market.id.toString(),
        ticker: `${market.base.symbol}/${market.quote.symbol}`,
        baseAdress: market.base.address,
        quoteAdress: market.quote.address,
        baseDecimal: market.base.decimal,
        quoteDecimal: market.quote.decimal,
        origin: market,
      };
    });
  };

  getOrderbook = async (marketId: string): Promise<Orderbook> => {
    const response = await this.api.spin.getOrderbook({
      marketId: Number(marketId),
    });

    return {
      apiID: this.getID(),
      marketId,
      asks: response.ask_orders ?? [],
      bids: response.bid_orders ?? [],
      origin: response,
    };
  };

  placeAskMarket = async (order: OrderMarket) => {
    await this.api.spin.placeAsk({
      tokenAddress: order.tokenAdress,
      marketId: Number(order.marketId),
      // TOOD: must be max price
      price: BigInt(0),
      quantity: BigInt(order.size),
      marketOrder: true,
    });
  };

  placeAskLimit = async (order: OrderLimit) => {
    await this.api.spin.placeAsk({
      tokenAddress: order.tokenAdress,
      marketId: Number(order.marketId),
      price: BigInt(order.price),
      quantity: BigInt(order.size),
      marketOrder: false,
    });
  };

  placeBidMarket = async (order: OrderMarket) => {
    await this.api.spin.placeBid({
      tokenAddress: order.tokenAdress,
      marketId: Number(order.marketId),
      // TOOD: must be max price
      price: BigInt(0),
      quantity: BigInt(order.size),
      marketOrder: true,
    });
  };

  placeBidLimit = async (order: OrderLimit) => {
    await this.api.spin.placeBid({
      tokenAddress: order.tokenAdress,
      marketId: Number(order.marketId),
      price: BigInt(order.price),
      quantity: BigInt(order.size),
      marketOrder: false,
    });
  };

  withdraw = async (exchange: Exchange) => {
    console.log(exchange);
  };

  deposit = async (exchange: Exchange) => {
    console.log(exchange);
  };
}
