import { Module } from '@nestjs/common';
import { DadosModule } from './modules/dados/dados.module';
import { DataGatewayModule } from './modules/gateways/data-gateway.module';
import { DataGateway } from './modules/gateways/data.gateway';
import { TrilhaModule } from './modules/trilha/trilha.module';
import { QueueModule } from './queue/queue.module';
import { DataService } from './queue/src/modules/data/data.service';

@Module({
  imports: [QueueModule, DataGatewayModule, TrilhaModule, DadosModule],
  controllers: [],
  providers: [DataGateway, DataService],
})
export class AppModule {}
