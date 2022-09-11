import {injectable, inject} from 'inversify';
import {decs} from '@spinfi/number';

import {Data} from '../dataLoader/interface';
import {MarketTicker} from '../api/interface';
import {Command, ThinkStrategy} from './interface';
import {invariant} from '../utils/invariant';
import {DataParserMap, DataParserMapItem} from '../dataParser/DataParserMap';
import {Connector} from '../connector/interface';
import {Token} from '../di/Token';

const dec = (value = '', decimal = 0, to: number) => {
  return decs(value, decimal).convert(to);
};

const zero = decs();

const createThinkStrategyArbitrage = (marketsTickers: MarketTicker[]) => {
  @injectable()
  class ThinkStrategyArbitrage implements ThinkStrategy {
    @inject(Token.Connector)
    private connector!: Connector;

    private dataParser = new DataParserMap();

    private thinkAboutMarket = ([, {spin, tonic}]: [
      MarketTicker,
      DataParserMapItem,
    ]): Command[] => {
      const spinBestAsk = spin.orderbook.asks.at(0);
      const spinBestBid = spin.orderbook.bids.at(0);
      const tonicBestAsk = tonic.orderbook.asks.at(-1);
      const tonicBestBid = tonic.orderbook.bids.at(-1);

      const quoteDecimal = Math.max(
        spin.market.quoteDecimal,
        tonic.market.quoteDecimal,
      );

      const spinBestAskNum = dec(
        spinBestAsk?.price,
        spin.market.quoteDecimal,
        quoteDecimal,
      );

      const spinBestBidNum = dec(
        spinBestBid?.price,
        spin.market.quoteDecimal,
        quoteDecimal,
      );

      const tonicBestAskNum = dec(
        tonicBestAsk?.price,
        tonic.market.quoteDecimal,
        quoteDecimal,
      );

      const tonicBestBidNum = dec(
        tonicBestBid?.price,
        tonic.market.quoteDecimal,
        quoteDecimal,
      );

      const sellSpinBuyTonic = spinBestBidNum.minus(tonicBestAskNum);
      const sellTonicBuySpin = tonicBestBidNum.minus(spinBestAskNum);

      if (sellSpinBuyTonic.gte(sellTonicBuySpin)) {
        if (sellSpinBuyTonic.eq(zero)) {
          return [];
        }

        return [
          {
            type: 'placeAsk',
            run: async () => {
              const api = this.connector.getApi('Spin');

              await api.placeAskMarket({
                tokenAdress: spin.market.baseAdress,
                marketId: spin.market.marketId,
                size: '1',
              });
            },
          },
          {
            type: 'placeBid',
            run: async () => {
              const api = this.connector.getApi('Tonic');

              await api.placeBidMarket({
                tokenAdress: tonic.market.baseAdress,
                marketId: tonic.market.marketId,
                size: '1',
              });
            },
          },
        ];
      } else {
        if (sellTonicBuySpin.eq(zero)) {
          return [];
        }

        return [
          {
            type: 'placeAsk',
            run: async () => {
              const api = this.connector.getApi('Tonic');

              await api.placeAskMarket({
                tokenAdress: tonic.market.baseAdress,
                marketId: tonic.market.marketId,
                size: '1',
              });
            },
          },
          {
            type: 'placeBid',
            run: async () => {
              const api = this.connector.getApi('Spin');

              await api.placeBidMarket({
                tokenAdress: spin.market.baseAdress,
                marketId: spin.market.marketId,
                size: '1',
              });
            },
          },
        ];
      }
    };

    think = async (data: Data) => {
      const mapper = this.dataParser.parse(data);

      marketsTickers.forEach((m) => {
        invariant(mapper.has(m), 'Selected Market Not Shared');
      });

      return Array.from(mapper.entries())
        .filter(([ticker]) => marketsTickers.includes(ticker))
        .map(this.thinkAboutMarket)
        .flat();
    };
  }

  return ThinkStrategyArbitrage;
};

export const ThinkStrategyArbitrage = createThinkStrategyArbitrage([
  'NEAR/USDC',
]);
