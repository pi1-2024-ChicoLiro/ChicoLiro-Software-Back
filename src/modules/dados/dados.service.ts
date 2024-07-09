import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'database/prisma.service';
import { DataService } from 'src/queue/src/modules/data/data.service';
import { ResponseMessageDto } from 'src/shared/dto/ResponseMessage.dto';

@Injectable()
export class DadosService {
  constructor(
    private prismaService: PrismaService,
    private dataQueueService: DataService,
  ) {}

  async findbyTrilha(trilhaId: string, page: number, limit: number) {
    try {
      const [dados, count] = await Promise.all([
        await this.prismaService.dados.findMany({
          where: { trilhaId },
          take: limit,
          skip: (page - 1) * limit,
          orderBy: { createdAt: 'asc' },
        }),
        await this.prismaService.dados.count({
          where: { trilhaId },
        }),
      ]);

      dados.forEach((item: any) => {
        item.rpm = (item.rpmMotorDir + item.rpmMotorEsq) / 2;

        item.aceleracaoInstantaneaFormatted =
          item.aceleracaoInstantanea.toFixed(2);

        item.velocidadeInstantaneaFormatted =
          item.velocidadeInstantanea.toFixed(2);

        item.createdAtFormatted = new Date(item.createdAt).toLocaleString();
      });

      return new ResponseMessageDto({
        success: true,
        data: { dados, count },
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

  async getAll(page: number, limit: number) {
    try {
      const [dados, count] = await Promise.all([
        await this.prismaService.dados.findMany({
          take: limit,
          skip: (page - 1) * limit,
          orderBy: { createdAt: 'asc' },
        }),
        await this.prismaService.dados.count(),
      ]);

      dados.forEach((item: any) => {
        item.rpm = (item.rpmMotorDir + item.rpmMotorEsq) / 2;
        item.aceleracaoInstantaneaFormatted =
          item.aceleracaoInstantanea.toFixed(2);

        item.velocidadeInstantaneaFormatted =
          item.velocidadeInstantanea.toFixed(2);

        item.createdAtFormatted = new Date(item.createdAt).toLocaleString();
      });

      return new ResponseMessageDto({
        success: true,
        data: { dados, count },
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

  async receiveData(data: any) {
    const json = JSON.parse(data);
    json.date = new Date().getTime();
    await this.dataQueueService.handleData(json);
  }
}
