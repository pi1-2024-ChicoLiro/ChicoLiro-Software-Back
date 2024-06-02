import { Module } from '@nestjs/common';
import { TrilhaService } from './trilha.service';
import { TrilhaController } from './trilha.controller';
import { PrismaService } from 'database/prisma.service';

@Module({
  providers: [TrilhaService, PrismaService],
  controllers: [TrilhaController],
})
export class TrilhaModule {}
