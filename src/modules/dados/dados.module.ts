import { Module } from '@nestjs/common';
import { DadosService } from './dados.service';
import { DadosController } from './dados.controller';
import { PrismaService } from 'database/prisma.service';

@Module({
  providers: [DadosService, PrismaService],
  controllers: [DadosController],
})
export class DadosModule {}
