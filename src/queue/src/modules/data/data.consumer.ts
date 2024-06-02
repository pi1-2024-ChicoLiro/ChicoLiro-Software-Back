import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { DataGateway } from 'src/modules/gateways/data.gateway';
import { DATA_QUEUE } from 'src/shared/constants';

@Processor(DATA_QUEUE)
export class DataConsumer {
  logger = new Logger(DataConsumer.name);
  constructor(private dataGateway: DataGateway) {}
  @Process()
  async handleData(job: Job) {
    this.logger.log('Recebendo dados: ' + job.data);
    // console.log({ fila: job.data });
    this.dataGateway.sendData(job.data);
  }
}
