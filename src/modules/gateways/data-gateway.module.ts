import { Module } from '@nestjs/common';
import { DataGateway } from './data.gateway';

@Module({
  imports: [],
  providers: [DataGateway],
  exports: [DataGateway],
})
export class DataGatewayModule {}
