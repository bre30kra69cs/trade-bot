import {OrderbookData} from './Orderbook.types';
import {useFetch} from './useFetch';

export const useOrderbook = () => {
  return useFetch<OrderbookData, Error>('orderbook');
};
