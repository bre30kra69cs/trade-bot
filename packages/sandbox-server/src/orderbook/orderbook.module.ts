import {Module} from '@nestjs/common';

import {OrderbookController} from './orderbook.controller';
import {OrderbookService} from './orderbook.service';

@Module({
  imports: [],
  controllers: [OrderbookController],
  providers: [OrderbookService],
})
export class OrderbookModule {}
