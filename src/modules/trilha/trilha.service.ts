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
          error: 'Could not create the record',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll() {
    try {
      const trilhas = await this.prismaService.trilha.findMany();

      const todosDados = await this.prismaService.dados.findMany();

      const response = trilhas.map((trilha) => {
        const dadosRelacionados = todosDados.filter(
          (dados) => dados.trilhaId === trilha.id,
        );
        return {
          ...trilha,
          dados: dadosRelacionados,
        };
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

  async findOne(id: string) {
    try {
      const trilha = await this.prismaService.trilha.findUnique({
        where: { id },
      });

      const todosDados = await this.prismaService.dados.findMany({
        where: { id },
      });

      const response = {
        ...trilha,
        dados: todosDados,
      };

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

  async update(id: string, updateTrilhaDto: UpdateTrilhaDto) {
    try {
      const response = await this.prismaService.trilha.update({
        where: { id },
        data: updateTrilhaDto,
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
