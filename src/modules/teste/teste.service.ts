import { Injectable } from '@nestjs/common';
import { PrismaService } from 'database/prisma.service';
import { DataService } from 'src/queue/src/modules/data/data.service';

@Injectable()
export class TesteService {
  constructor(
    private prismaService: PrismaService,
    private queueService: DataService,
  ) {}

  async create(createTesteDto: any) {
    await this.queueService.handleData(createTesteDto);
    // const response = await this.prismaService.teste.create({
    //   data: createTesteDto,
    // });
    // console.log(response);
    // return response;
  }

  findAll() {
    return `This action returns all teste`;
  }

  findOne(id: number) {
    return `This action returns a #${id} teste`;
  }

  update(id: number, updateTesteDto: any) {
    return `This action updates a #${id} teste`;
  }

  remove(id: number) {
    return `This action removes a #${id} teste`;
  }
}
