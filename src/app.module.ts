import { Module } from '@nestjs/common';
import { DataGatewayModule } from './modules/gateways/data-gateway.module';
import { DataGateway } from './modules/gateways/data.gateway';
import { TesteModule } from './modules/teste/teste.module';
import { QueueModule } from './queue/queue.module';
import { DataService } from './queue/src/modules/data/data.service';

@Module({
  imports: [QueueModule, DataGatewayModule, TesteModule],
  controllers: [],
  providers: [DataGateway, DataService],
})
export class AppModule {}
