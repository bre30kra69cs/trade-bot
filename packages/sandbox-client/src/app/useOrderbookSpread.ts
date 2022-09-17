import {useOrderbook} from './useOrderbook';

export const useOrderbookSpread = () => {
  const orderbook = useOrderbook();
  const bestAsk = Number(orderbook.asks[0][0] ?? 0);
  const bestBid = Number(orderbook.bids[0][0] ?? 0);
  const spread = Math.abs(bestAsk - bestBid);
  const precent = Math.floor((spread / bestBid) * 100);
  return [spread, precent];
};
