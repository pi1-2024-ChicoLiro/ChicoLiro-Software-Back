import { Injectable } from '@nestjs/common';
import { PrismaService } from 'database/prisma.service';
import { ResponseMessageDto } from 'src/shared/dto/ResponseMessage.dto';

@Injectable()
export class GraficosService {
  constructor(private prismaService: PrismaService) {}

  async getTrilhasSucedidas() {
    const trilhas = await this.prismaService.trilha.findMany({
      where: {
        failed: false,
      },
      orderBy: {
        startMovingDatetime: 'desc',
      },
      take: 3,
      include: {
        dados: {
          orderBy: {
            createdAt: 'asc',
          },
        },
      },
    });

    return trilhas.reverse();
  }

  async formatarDadosGraficos() {
    const trilhas = await this.getTrilhasSucedidas();

    const dadosTrilhas = []; // Dados para os cards visao geral de cada trilhas
    const dadosVelocidadeTempoFormatados = []; // Dados formatados para o gráfico de velocidade
    const dadosVelocidadeAceleracaoFormatados = [
      // Dados formatados para o gráfico de velocidade, aceleção e tensão
      {
        name: 'Aceleração Média',
        data: [],
      },
      {
        name: 'Velocidade Média',
        data: [],
      },
      {
        name: 'Tensão Média',
        data: [],
      },
    ];

    trilhas.forEach((trilha, index) => {
      const bodyVelocidadeTempo = {
        name: `Percurso ${index + 1}`,
        data: [],
      };

      let somaAcel = 0;
      let somaVel = 0;
      let somaTensao = 0;

      const length = trilha.dados.length;

      trilha.dados.forEach((item) => {
        bodyVelocidadeTempo.data.push(
          parseFloat(item.velocidadeInstantanea.toFixed(2)),
        );

        somaAcel += item.aceleracaoInstantanea;
        somaVel += item.velocidadeInstantanea;
        somaTensao += item.tensao;
      });

      const mediaAcel = somaAcel / length;
      const mediaVel = somaVel / length;
      const mediaTensao = somaTensao / length;

      dadosTrilhas.push({
        percurso: `Percurso ${index + 1}`,
        aceleracao: parseFloat(mediaAcel.toFixed(2)),
        velocidade: parseFloat(mediaVel.toFixed(2)),
        tempoPercurso: trilha.tempoDePercurso,
        tensao: parseFloat(mediaTensao.toFixed(2)),
        distancia: trilha.distanciaPercorrida,
      });

      dadosVelocidadeAceleracaoFormatados[0].data.push({
        x: `Percurso ${index + 1}`,
        y: parseFloat(mediaAcel.toFixed(2)),
      });

      dadosVelocidadeAceleracaoFormatados[1].data.push({
        x: `Percurso ${index + 1}`,
        y: parseFloat(mediaVel.toFixed(2)),
      });

      dadosVelocidadeAceleracaoFormatados[2].data.push({
        x: `Percurso ${index + 1}`,
        y: parseFloat(mediaTensao.toFixed(2)),
      });

      dadosVelocidadeTempoFormatados.push(bodyVelocidadeTempo);
    });

    return new ResponseMessageDto({
      success: true,
      data: {
        dadosVelocidadeTempoFormatados,
        dadosVelocidadeAceleracaoFormatados,
        dadosTrilhas,
      },
      message: 'Dados formatados com sucesso!',
    });
  }

  async getDataLine() {
    const response = await this.prismaService.dados.findMany({
      where: {
        trilha: {
          failed: false,
          // isMoving: true,
        },
      },
      select: {
        rpmMotorDir: true,
        rpmMotorEsq: true,
        trilhaId: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    // Agrupar os dados por trilhaId
    const groupedData = response.reduce((acc, item) => {
      if (!acc[item.trilhaId]) {
        acc[item.trilhaId] = [];
      }
      acc[item.trilhaId].push({
        rpmMotorDir: item.rpmMotorDir,
        rpmMotorEsq: item.rpmMotorEsq,
      });
      return acc;
    }, {});

    // Converter o objeto agrupado em um array de objetos
    const result = Object.keys(groupedData).map((trilhaId) => ({
      trilhaId: trilhaId,
      data: groupedData[trilhaId],
    }));

    return new ResponseMessageDto({
      success: true,
      data: result,
      message: 'Dados obtidos com sucesso!',
    });
  }
}
