import { Module } from '@nestjs/common';
import { PrismaService } from 'database/prisma.service';
import { GraficosController } from './graficos.controller';
import { GraficosService } from './graficos.service';

@Module({
  providers: [GraficosService, PrismaService],
  controllers: [GraficosController],
})
export class GraficosModule {}
