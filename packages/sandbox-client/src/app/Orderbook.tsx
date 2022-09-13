import React, {FC} from 'react';

import {useOrderbook} from './useOrderbook';

interface OrderbookProps {}

export const Orderbook: FC<OrderbookProps> = () => {
  const res = useOrderbook();

  return <article></article>;
};
