import React, {Suspense, FC} from 'react';

import {useOrderbook} from './useOrderbook';
import {useOrderbookSpread} from './useOrderbookSpread';
import {Loader} from './Loader';
import {Catcher} from './Catcher';
import {Failer} from './Failer';

import './Orderbook.css';

const OrderbookContent: FC = () => {
  const orderbook = useOrderbook();
  const [spread, precent] = useOrderbookSpread();

  return (
    <>
      <section className="ColReverse FlexGrow1 OrderbookSide">
        {orderbook.asks.map((ask) => {
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
      <section className="Row OrderbookSpread">
        <span className="OrderbookSpreadPrice Text">{spread}</span>
        <span className="OrderbookSpreadTitle Text">Spread</span>
        <span className="OrderbookSpreadPercent Text">{precent}%</span>
      </section>
      <section className="Col FlexGrow1 OrderbookSide">
        {orderbook.bids.map((bid) => {
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
        <Catcher fallback={<Failer />}>
          <Suspense fallback={<Loader />}>
            <OrderbookContent />
          </Suspense>
        </Catcher>
      </main>
    </article>
  );
};
