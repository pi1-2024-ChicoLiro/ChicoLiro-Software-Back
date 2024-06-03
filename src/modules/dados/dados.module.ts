import { Module } from '@nestjs/common';
import { PrismaService } from 'database/prisma.service';
import { DataModule } from 'src/queue/src/modules/data/data.module';
import { DataService } from 'src/queue/src/modules/data/data.service';
import { DadosController } from './dados.controller';
import { DadosService } from './dados.service';

@Module({
  imports: [DataModule],
  providers: [DadosService, PrismaService, DataService],
  controllers: [DadosController],
})
export class DadosModule {}
