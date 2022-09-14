import React, {FC} from 'react';

import {Layout} from './Layout';
import {Orderbook} from './Orderbook';

export const Board: FC = () => {
  return (
    <Layout>
      <Orderbook />
    </Layout>
  );
};
