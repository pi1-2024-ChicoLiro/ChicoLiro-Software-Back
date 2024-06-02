import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'database/prisma.service';
import { CreateDadosDto } from './dto/create-dados.dto';
import { UpdateDadosDto } from './dto/update-dados.dto';

@Injectable()
export class DadosService {
  constructor(private prismaService: PrismaService) {}

  async create(createDadosDto: CreateDadosDto) {
    try {
      const response = await this.prismaService.dados.create({
        data: createDadosDto,
      });

      console.log(response);
      return response;
    } catch (err) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Could not create the record',
          errorLog: err,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll() {
    try {
      const response = await this.prismaService.dados.findMany();
      return response;
    } catch (err) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Could not find the record',
          errorLog: err,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findOne(id: string) {
    try {
      const response = await this.prismaService.dados.findUnique({
        where: { id },
      });

      return response;
    } catch (err) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Could not find the record',
          errorLog: err,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async update(id: string, updateDadosDto: UpdateDadosDto) {
    try {
      const response = await this.prismaService.dados.update({
        where: { id },
        data: updateDadosDto,
      });

      return response;
    } catch (err) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Could not find the record',
          errorLog: err,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
