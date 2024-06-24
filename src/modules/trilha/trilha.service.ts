import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'database/prisma.service';
import { ResponseMessageDto } from 'src/shared/dto/ResponseMessage.dto';
import { CreateTrilhaDto } from './dto/create-trilha.dto';
import { FailedTrilhaDto } from './dto/failed-trilha.dto';
import { UpdateTrilhaDto } from './dto/update-trilha.dto';
@Injectable()
export class TrilhaService {
  constructor(private prismaService: PrismaService) {}

  async create(createTrilhaDto: CreateTrilhaDto) {
    try {
      const response = await this.prismaService.trilha.create({
        data: {
          isMoving: true,
          startMovingDatetime: createTrilhaDto.startMovingDatetime,
          createdAt: new Date(),
        },
      });
      return new ResponseMessageDto({
        success: true,
        data: response,
        message: 'Trilha criada com sucesso!',
      });
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

  async failed(body: FailedTrilhaDto) {
    try {
      const trilha = await this.prismaService.trilha.findFirst({
        where: { isMoving: true },
      });

      if (!trilha) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: 'Could not find the record',
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      const response = await this.prismaService.trilha.update({
        where: { id: trilha.id },
        data: {
          isMoving: false,
          endMovingDatetime: body.endMovingDatetime,
          updatedAt: new Date(),
        },
      });

      return new ResponseMessageDto({
        success: true,
        data: response,
        message: 'Trilha criada com sucesso!',
      });
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

  async getPaginado(trilhaId: string, page: number, limit: number) {
    try {
      const [trilhas, count] = await Promise.all([
        await this.prismaService.trilha.findMany({
          where: { id: trilhaId },
          take: limit,
          skip: (page - 1) * limit,
        }),
        await this.prismaService.trilha.count({
          where: { id: trilhaId },
        }),
      ]);

      trilhas.map((item: any, index) => {
        item.name =
          'Percurso ' +
          (index + 1) +
          ' - ' +
          (item.failed ? 'Falhado' : 'Bem-sucedido');

        item.isMovingFormatted = item.isMoving ? 'Sim' : 'Não';
        item.startMovingDatetimeFormatted = new Date(
          item.startMovingDatetime,
        ).toLocaleString();

        item.endMovingDatetimeFormatted =
          item?.endMovingDatetime?.toLocaleString();
      });

      return new ResponseMessageDto({
        success: true,
        data: { trilhas, count },
      });
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

  async getAll() {
    try {
      const response = await this.prismaService.trilha.findMany();
      response.map((item: any, index) => {
        item.name =
          'Percurso ' +
          (index + 1) +
          ' - ' +
          (item.failed ? 'Falhada' : 'Bem-sucedida');
      });
      return new ResponseMessageDto({
        success: true,
        data: response,
      });
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
