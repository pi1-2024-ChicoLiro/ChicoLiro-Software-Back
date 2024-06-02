import { ExpressAdapter } from '@bull-board/express';
import { BullBoardModule } from '@bull-board/nestjs';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { DataModule } from './src/modules/data/data.module';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'redisLocal',
        port: 6000,
        password: 'NKaw8zKdqC4AE9dT',
      },
    }),
    BullBoardModule.forRoot({
      route: '/queues',
      adapter: ExpressAdapter,
      boardOptions: {
        uiConfig: {
          boardTitle: 'Chicoliro Filas',
          locale: {
            lng: 'pt-BR',
          },
        },
      },
    }),
    DataModule,
  ],
  controllers: [],
  providers: [],
  exports: [DataModule],
})
export class QueueModule {}
