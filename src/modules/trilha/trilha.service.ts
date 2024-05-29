import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'database/prisma.service';
import { CreateTrilhaDto } from './dto/create-trilha.dto';
import { UpdateTrilhaDto } from './dto/update-trilha.dto';
@Injectable()
export class TrilhaService {
  constructor(private prismaService: PrismaService) {}

  async create(createTrilhaDto: CreateTrilhaDto) {
    try {
      const response = await this.prismaService.trilha.create({
        data: createTrilhaDto,
      });
      console.log(response);
      return response;
    } catch (err) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Could not find the record',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
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
}
