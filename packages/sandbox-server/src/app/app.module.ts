import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import {AppController} from './app.controller';
import {AppService} from './app.service';
import {OrderbookModule} from '../orderbook/orderbook.module';
import {ProfilesModule} from '../profiles/profiles.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest'),
    OrderbookModule,
    ProfilesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
