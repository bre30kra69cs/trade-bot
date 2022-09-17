import {Controller, Get} from '@nestjs/common';

import {OrderbookService} from './orderbook.service';

@Controller('orderbook')
export class OrderbookController {
  constructor(private readonly orderbookService: OrderbookService) {}

  @Get()
  getOrderbook() {
    return this.orderbookService.getOrderbook();
  }
}
