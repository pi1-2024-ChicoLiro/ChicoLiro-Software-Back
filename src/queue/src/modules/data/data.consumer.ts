import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { PrismaService } from 'database/prisma.service';
import { DataGateway } from 'src/modules/gateways/data.gateway';
import { DATA_QUEUE } from 'src/shared/constants';
import { DataConsumerType } from 'src/shared/types/data-consumer.type';

@Processor(DATA_QUEUE)
export class DataConsumer {
  logger = new Logger(DataConsumer.name);
  constructor(
    private dataGateway: DataGateway,
    private prismaService: PrismaService,
  ) {}
  @Process()
  async handleData(job: Job<DataConsumerType>) {
    const { isMoving, rpmMotorDir, rpmMotorEsq, tensao } = job.data;

    let trilha = await this.prismaService.trilha.findFirst({
      where: {
        isMoving: true,
      },
    });

    if (!isMoving && trilha) {
      // const distancia = this.calcularDistancia(
      //   trilha.velocidadeMedia,
      //   tempo,
      // );
      await this.prismaService.trilha.update({
        where: {
          id: trilha.id,
        },
        data: {
          isMoving: false,
          endMovingDatetime: new Date(),
          tempoDePercurso:
            Math.floor(
              (new Date().getTime() - trilha.startMovingDatetime.getTime()) /
                60000,
            ) +
            ' minutos e  ' +
            (
              ((new Date().getTime() - trilha.startMovingDatetime.getTime()) %
                60000) /
              1000
            ).toFixed(0) +
            ' segundos',
          // distanciaPercorrida: distancia
        },
      });
      return;
    }

    if (!trilha) {
      trilha = await this.prismaService.trilha.create({
        data: {
          isMoving: true,
          startMovingDatetime: new Date(),
        },
      });
    }

    const velocidade = this.calcularVelocidade(rpmMotorDir, rpmMotorEsq); //ok

    const aceleracao = this.calcularAceleracao(velocidade, 1);

    const dados = await this.prismaService.dados.create({
      data: {
        rpmMotorDir,
        rpmMotorEsq,
        tensao,
        trilha: {
          connect: {
            id: trilha.id,
          },
        },
        aceleracaoInstantanea: aceleracao,
        velocidadeInstantanea: velocidade,
      },
    });

    this.dataGateway.sendData({
      success: true,
      data: dados,
    });
  }

  //trajetoria percorrida, velocidade instantanea, aceleracao instantanea,  tempo de percurso, consumo energetico

  calcularTempo(distancia: number, velocidade: number) {
    return distancia / velocidade;
  }

  // calculos para cada dado
  calcularVelocidade(rpmMotorDir: number, rpmMotorEsq: number) {
    const mediaRpm = (rpmMotorDir + rpmMotorEsq) / 2;

    const raio = 0.034;

    const velocidadeAngular = (mediaRpm * 2 * Math.PI) / 60;

    return raio * velocidadeAngular;
  }

  calcularAceleracao(velocidade: number, tempo: number) {
    return velocidade / tempo;
  }

  //calculos da trilha

  calcularDistancia(velocidade: number, tempo: number) {
    return velocidade * tempo;
  }
}
