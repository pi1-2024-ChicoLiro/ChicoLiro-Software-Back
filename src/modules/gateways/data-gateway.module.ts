import { Global, Module } from '@nestjs/common';
import { DataModule } from 'src/queue/src/modules/data/data.module';
import { DataService } from 'src/queue/src/modules/data/data.service';
import { GraficosService } from '../graficos/graficos.service';
import { DataGateway } from './data.gateway';

@Global()
@Module({
  imports: [DataModule],
  providers: [DataGateway, DataService, GraficosService],
  exports: [DataGateway],
})
export class DataGatewayModule {}
