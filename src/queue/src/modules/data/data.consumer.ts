import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { DATA_QUEUE } from '../../contants';

@Processor(DATA_QUEUE)
export class DataConsumer {
  @Process()
  async handleData(job: Job) {
    console.log(job.data);
  }
}
