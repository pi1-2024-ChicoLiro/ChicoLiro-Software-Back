import { Module } from '@nestjs/common';
import { DataModule } from 'src/queue/src/modules/data/data.module';
import { DataService } from 'src/queue/src/modules/data/data.service';
import { DataGateway } from './data.gateway';

@Module({
  imports: [DataModule],
  providers: [DataGateway, DataService],
  exports: [DataGateway],
})
export class DataGatewayModule {}
