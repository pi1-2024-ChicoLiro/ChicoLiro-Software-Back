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
  private distanciaTotal = 0; // Variável para acumular a distância total
  private lastRequestTime = 0;
  private lastVelocidade = 0;

  constructor(
    private dataGateway: DataGateway,
    private prismaService: PrismaService,
  ) {}

  public set setDistanciaTotal(v: number) {
    this.distanciaTotal = v;
  }

  public get getDistanciaTotal(): number {
    return this.distanciaTotal;
  }

  public set setLastVelocidade(v: number) {
    this.lastVelocidade = v;
  }

  public get getLastVelocidade(): number {
    return this.lastVelocidade;
  }

  public set setLastRequestTime(v: number) {
    this.lastRequestTime = v;
  }

  public get getLastRequestTime(): number {
    return this.lastRequestTime;
  }

  @Process()
  async handleData(job: Job<DataConsumerType>) {
    const { isMoving, rpmMotorDir, rpmMotorEsq, tensao } = job.data;

    let trilha = await this.prismaService.trilha.findFirst({
      where: {
        isMoving: true,
      },
    });

    if (!isMoving && trilha) {
      // Salva a distância total ao final da trilha
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
          distanciaPercorrida: this.distanciaTotal, // Salva a distância total
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
      // Reinicia a distância total para a próxima trilha
      this.distanciaTotal = 0;
      this.lastVelocidade = 0;
      this.lastRequestTime = Number(this.prismaService.dados.fields.date);
    }

    const tempoRequest = this.calcularTempoDoRequest();

    const velocidade = this.calcularVelocidade(rpmMotorDir, rpmMotorEsq);

    const aceleracao = this.calcularAceleracao(velocidade, tempoRequest);

    // const consumo = this.calcularConsumoEnergetico(velocidade, tempoRequest);

    const distancia = this.calcularDistancia(velocidade, tempoRequest);

    this.lastVelocidade = velocidade;
    this.distanciaTotal = this.distanciaTotal + distancia;
    this.lastRequestTime = Number(this.prismaService.dados.fields.date);

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
        // consumoEnergetico: consumo,
      },
    });

    this.dataGateway.sendData({
      sucess: true,
      data: dados,
    });
  }

  calcularTempoDoRequest() {
    return (
      (Number(this.prismaService.dados.fields.date) - this.lastRequestTime) /
      1000
    );
  }

  calcularVelocidade(rpmMotorDir: number, rpmMotorEsq: number) {
    const mediaRpm = (rpmMotorDir + rpmMotorEsq) / 2;
    const raio = 3.4; // cm
    const velocidadeAngular = (mediaRpm * 2 * Math.PI) / 60;
    return Number((raio * velocidadeAngular).toFixed(2));
  }

  calcularAceleracao(velocidade: number, tempo: number) {
    const variacaoVelocidade = velocidade - this.lastVelocidade;
    return Number((variacaoVelocidade / tempo).toFixed(2));
  }

  // calcularConsumoEnergetico(velocidade: number, tempo: number) {
  //   return velocidade * tempo;
  // }

  calcularDistancia(velocidade: number, tempo: number) {
    return Number((velocidade * tempo).toFixed(2));
  }
}
