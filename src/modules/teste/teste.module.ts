import { Module } from '@nestjs/common';
import { PrismaService } from 'database/prisma.service';
import { TesteController } from './teste.controller';
import { TesteService } from './teste.service';

@Module({
  controllers: [TesteController],
  providers: [TesteService, PrismaService],
})
export class TesteModule {}
