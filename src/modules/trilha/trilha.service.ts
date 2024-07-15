import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'database/prisma.service';
import { ResponseMessageDto } from 'src/shared/dto/ResponseMessage.dto';
import { CreateTrilhaDto } from './dto/create-trilha.dto';
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

  async failed(body: any) {
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
          endMovingDatetime: new Date(),
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
          select: {
            id: true,
            isMoving: true,
            startMovingDatetime: true,
            endMovingDatetime: true,
            failed: true,
          },
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
        item.startMovingDatetimeFormatted = this.formatarDataHora(
          item.startMovingDatetime,
        );

        item.endMovingDatetimeFormatted = this.formatarDataHora(
          item.endMovingDatetime,
        );
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

  formatarDataHora(isoString: string): string {
    const data = new Date(isoString);

    const dia = data.getDate().toString().padStart(2, '0');
    const mes = (data.getMonth() + 1).toString().padStart(2, '0');
    const ano = data.getFullYear();

    let horas = data.getHours();
    const minutos = data.getMinutes().toString().padStart(2, '0');
    const segundos = data.getSeconds().toString().padStart(2, '0');

    const periodo = horas >= 12 ? 'PM' : 'AM';
    horas = horas % 12 || 12; // Converte 0 para 12 para formato 12h

    const horaFormatada = horas.toString().padStart(2, '0');

    return `${dia}/${mes}/${ano}, ${horaFormatada}:${minutos}:${segundos} ${periodo}`;
  }
}
