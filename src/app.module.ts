import { Module } from '@nestjs/common';
import { DadosModule } from './modules/dados/dados.module';
import { GraficosModule } from './modules/graficos/graficos.module';
import { TrilhaModule } from './modules/trilha/trilha.module';
import { QueueModule } from './queue/queue.module';
import { DataService } from './queue/src/modules/data/data.service';

@Module({
  imports: [QueueModule, TrilhaModule, DadosModule, GraficosModule],
  controllers: [],
  providers: [DataService],
})
export class AppModule {}
