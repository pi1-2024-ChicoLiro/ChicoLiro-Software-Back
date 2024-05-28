import { Injectable } from '@nestjs/common';
import { PrismaService } from 'database/prisma.service';
import { CreateDadosDto } from './dto/create-dados.dto';
import { UpdateDadosDto } from './dto/update-dados.dto';

@Injectable()
export class DadosService {
  constructor(private prismaService: PrismaService) {}

  async create(createDadosDto: CreateDadosDto) {
    console.log(createDadosDto);
  }

  findAll() {
    return `This action returns all teste`;
  }

  findOne(id: number) {
    return `This action returns a #${id} teste`;
  }

  update(id: number, updateTrilhaDto: UpdateDadosDto) {
    return `This action updates a #${id} teste`;
  }

  remove(id: number) {
    return `This action removes a #${id} teste`;
  }
}
