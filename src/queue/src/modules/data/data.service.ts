import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { DATA_QUEUE } from 'src/shared/constants';
import { DataConsumerType } from 'src/shared/types/data-consumer.type';

@Injectable()
export class DataService {
  constructor(@InjectQueue(DATA_QUEUE) private readonly dataQueue: Queue) {}

  async handleData(data: DataConsumerType): Promise<void> {
    await this.dataQueue.add(data);
  }
}
