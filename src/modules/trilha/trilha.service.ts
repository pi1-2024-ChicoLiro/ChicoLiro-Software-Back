import { Injectable } from '@nestjs/common';
import { PrismaService } from 'database/prisma.service';
import { CreateTrilhaDto } from './dto/create-trilha.dto';
import { UpdateTrilhaDto } from './dto/update-trilha.dto';

@Injectable()
export class TrilhaService {
  constructor(private prismaService: PrismaService) {}

  async create(createTrilhaDto: CreateTrilhaDto) {
    console.log(createTrilhaDto);
  }

  findAll() {
    return `This action returns all teste`;
  }

  findOne(id: number) {
    return `This action returns a #${id} teste`;
  }

  update(id: number, updateTrilhaDto: UpdateTrilhaDto) {
    return `This action updates a #${id} teste`;
  }

  remove(id: number) {
    return `This action removes a #${id} teste`;
  }
}
