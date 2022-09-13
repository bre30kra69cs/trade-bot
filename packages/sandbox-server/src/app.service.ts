import {Injectable} from '@nestjs/common';

@Injectable()
export class AppService {
  getOrderbook() {
    return {
      asks: [['1000', '2000']],
      bids: [['99', '11'], ['1001, 2002']],
    };
  }
}
