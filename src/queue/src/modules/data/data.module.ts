import { BullAdapter } from '@bull-board/api/bullAdapter';
import { BullBoardModule } from '@bull-board/nestjs';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { PrismaService } from 'database/prisma.service';
import { DataGateway } from 'src/modules/gateways/data.gateway';
import { DATA_QUEUE } from 'src/shared/constants';
import { DataConsumer } from './data.consumer';
import { DataService } from './data.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: DATA_QUEUE,
    }),
    BullBoardModule.forFeature({
      name: DATA_QUEUE,
      adapter: BullAdapter,
    }),
  ],
  providers: [DataService, DataConsumer, DataGateway, PrismaService],
  exports: [BullModule],
})
export class DataModule {}
