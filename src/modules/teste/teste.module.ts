import { Module } from '@nestjs/common';
import { PrismaService } from 'database/prisma.service';
import { QueueModule } from 'src/queue/queue.module';
import { DataService } from 'src/queue/src/modules/data/data.service';
import { TesteController } from './teste.controller';
import { TesteService } from './teste.service';

@Module({
  imports: [QueueModule],
  controllers: [TesteController],
  providers: [TesteService, PrismaService, DataService],
})
export class TesteModule {}
