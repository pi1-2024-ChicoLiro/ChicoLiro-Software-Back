import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { DataGateway } from 'src/modules/gateways/data.gateway';
import { DATA_QUEUE } from 'src/shared/constants';

@Processor(DATA_QUEUE)
export class DataConsumer {
  constructor(private dataGateway: DataGateway) {}
  @Process()
  async handleData(job: Job) {
    console.log({ fila: job.data });
    this.dataGateway.sendData(job.data);
  }
}
