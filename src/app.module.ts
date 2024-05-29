import { Module } from '@nestjs/common';
import { TesteModule } from './modules/teste/teste.module';
import { QueueModule } from './queue/queue.module';

@Module({
  imports: [QueueModule, TesteModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
