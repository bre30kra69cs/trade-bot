import React, {Suspense, FC} from 'react';

import {useOrderbook} from './useOrderbook';
import {Loader} from './Loader';

import './Orderbook.css';

const OrderbookContent: FC = () => {
  const data = useOrderbook();

  return (
    <>
      <section className="ColReverse FlexGrow1 OrderbookSide">
        {data.asks.map((ask) => {
          return (
            <section key={ask[0]} className="Row OrderbookNode">
              <span className="OrderbookPrice Text ColorCritical1">
                {ask[0]}
              </span>
              <span className="OrderbookAmount Text">{ask[1]}</span>
            </section>
          );
        })}
      </section>
      <section className="Col FlexGrow1 OrderbookSide">
        {data.bids.map((bid) => {
          return (
            <section key={bid[0]} className="Row OrderbookNode">
              <span className="OrderbookPrice Text ColorOk1">{bid[0]}</span>
              <span className="OrderbookAmount Text">{bid[1]}</span>
            </section>
          );
        })}
      </section>
    </>
  );
};

export const Orderbook: FC = () => {
  return (
    <article className="Col Orderbook">
      <header className="Row OrderbookHeader">
        <span className="OrderbookPrice Caption">Price</span>
        <span className="OrderbookAmount Caption">Amount</span>
      </header>
      <main className="Col OrderbookContent">
        <Suspense fallback={<Loader />}>
          <OrderbookContent />
        </Suspense>
      </main>
    </article>
  );
};
