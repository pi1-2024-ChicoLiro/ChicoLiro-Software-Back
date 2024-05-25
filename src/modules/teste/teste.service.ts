import { Injectable } from '@nestjs/common';
import { PrismaService } from 'database/prisma.service';
import { CreateTesteDto } from './dto/create-teste.dto';
import { UpdateTesteDto } from './dto/update-teste.dto';

@Injectable()
export class TesteService {
  constructor(private prismaService: PrismaService) {}

  async create(createTesteDto: CreateTesteDto) {
    console.log(createTesteDto);
    const response = await this.prismaService.teste.create({
      data: createTesteDto,
    });
    console.log(response);
    return response;
  }

  findAll() {
    return `This action returns all teste`;
  }

  findOne(id: number) {
    return `This action returns a #${id} teste`;
  }

  update(id: number, updateTesteDto: UpdateTesteDto) {
    return `This action updates a #${id} teste`;
  }

  remove(id: number) {
    return `This action removes a #${id} teste`;
  }
}
