import {Injectable} from '@nestjs/common';

@Injectable()
export class OrderbookService {
  getOrderbook() {
    return {
      asks: Array.from(new Array(Math.floor(Math.random() * 100)))
        .map(() => {
          return [
            Math.floor(Math.random() * 100) + 1,
            Math.floor(Math.random() * 100),
          ];
        })
        .sort((left, right) => {
          return left[0] - right[0];
        })
        .reduce((acc, next) => {
          const target = acc.at(-1);

          if (target) {
            if (target[0] === next[0]) {
              target[1] = target[1] + next[1];
            } else {
              acc.push(next);
            }
          } else {
            acc.push(next);
          }

          return acc;
        }, [] as number[][])
        .map((item) => {
          return [item[0].toString(), item[1].toString()];
        }),
      bids: Array.from(new Array(Math.floor(Math.random() * 100)))
        .map(() => {
          return [
            Math.floor(Math.random() * 100) + 1,
            Math.floor(Math.random() * 100),
          ];
        })
        .sort((left, right) => {
          return left[0] - right[0];
        })
        .reduce((acc, next) => {
          const target = acc.at(-1);

          if (target) {
            if (target[0] === next[0]) {
              target[1] = target[1] + next[1];
            } else {
              acc.push(next);
            }
          } else {
            acc.push(next);
          }

          return acc;
        }, [] as number[][])
        .map((item) => {
          return [item[0].toString(), item[1].toString()];
        }),
    };
  }
}
