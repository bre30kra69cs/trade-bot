import type {Market, MarketTicker, Orderbook} from '../api/interface';
import {Data} from '../dataLoader/interface';
import {DataParser} from './interface';

export interface DataParserMapItem {
  spin: {
    market: Market;
    orderbook: Orderbook;
  };
  tonic: {
    market: Market;
    orderbook: Orderbook;
  };
}

export class DataParserMap
  implements DataParser<Map<MarketTicker, DataParserMapItem>>
{
  private getSharedMarkets = (
    spinMarkets: Market[],
    tonikMarkets: Market[],
  ) => {
    const mapper = new Map<
      MarketTicker,
      {
        spin?: Market;
        tonic?: Market;
      }
    >();

    spinMarkets.forEach((m) => {
      mapper.set(m.ticker, {
        spin: m,
      });
    });

    tonikMarkets.forEach((m) => {
      const x = mapper.get(m.ticker);

      if (x) {
        x.tonic = m;
      }
    });

    const result = new Map<
      MarketTicker,
      {
        spin: Market;
        tonic: Market;
      }
    >();

    Array.from(mapper.entries()).forEach(([key, {spin, tonic}]) => {
      if (!!spin && !!tonic) {
        result.set(key, {
          spin,
          tonic,
        });
      }
    });

    return result;
  };

  parse = (data: Data) => {
    const markets = data.markets ?? [];
    const orderbooks = data.orderbooks ?? [];

    const marketsMapper = this.getSharedMarkets(
      markets.filter((m) => m.apiID === 'Spin'),
      markets.filter((m) => m.apiID === 'Tonic'),
    );

    const result = new Map<MarketTicker, DataParserMapItem>();

    Array.from(marketsMapper.entries()).forEach(([key, {spin, tonic}]) => {
      const spinOrderbook = orderbooks.find(
        (o) => o.apiID === spin.apiID && o.marketId === spin.marketId,
      );

      const tonicOrderbook = orderbooks.find(
        (o) => o.apiID === tonic.apiID && o.marketId === tonic.marketId,
      );

      if (!!spinOrderbook && !!tonicOrderbook) {
        result.set(key, {
          spin: {
            market: spin,
            orderbook: spinOrderbook,
          },
          tonic: {
            market: tonic,
            orderbook: tonicOrderbook,
          },
        });
      }
    });

    return result;
  };
}
