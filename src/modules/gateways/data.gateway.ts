import { Logger } from '@nestjs/common';
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { PrismaService } from 'database/prisma.service';
import { Server, Socket } from 'socket.io';
import { DataService } from 'src/queue/src/modules/data/data.service';

@WebSocketGateway({
  transports: ['websocket'],
  cors: {
    origin: '*',
  },
})
export class DataGateway
  implements OnGatewayConnection, OnGatewayInit, OnGatewayDisconnect
{
  logger = new Logger(DataGateway.name);
  constructor(
    private dataQueueService: DataService,
    private prismaService: PrismaService,
  ) {}

  @WebSocketServer() server: Server;

  handleConnection(client: Socket) {
    this.logger.log('Cliente conectado: ' + client.id);
    // console.log('Cliente conectado: ', client.id);
  }

  handleDisconnect(client: Socket) {
    this.logger.log('Cliente desconectado: ' + client.id);
    // console.log('Cliente desconectado: ', client.id);
  }

  afterInit() {
    this.logger.log('Servidor iniciado');
    // console.log('servidor iniciado');
  }

  @SubscribeMessage('receive-data')
  newData(client: Socket, @MessageBody() body: any) {
    this.dataQueueService.handleData(body);
  }

  async sendData(@MessageBody() body: any) {
    // Busca as 3 últimas trilhas não falhadas
    const trilhas = await this.prismaService.trilha.findMany({
      where: {
        failed: false,
      },
      orderBy: {
        startMovingDatetime: 'asc',
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

    const dadosVelocidadeTempoFormatados = []; // Dados formatados para o gráfico de velocidade x tempo
    const dadosVelocidadeAceleracaoFormatados = [
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
        name: `Trilha ${index + 1}`,
        data: [],
      };

      let somaAcel = 0;
      let somaVel = 0;
      let somaTensao = 0;
      const length = trilha.dados.length;

      trilha.dados.forEach((item) => {
        // const data =
        //   item.createdAt.getTime() - trilha.startMovingDatetime.getTime();

        // bodyVelocidadeTempo.data.push({
        //   x: data,
        //   y: parseFloat(item.velocidadeInstantanea.toFixed(2)),
        // });

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

      dadosVelocidadeAceleracaoFormatados[0].data.push({
        x: `Trilha ${index + 1}`,
        y: parseFloat(mediaAcel.toFixed(2)),
      });

      dadosVelocidadeAceleracaoFormatados[1].data.push({
        x: `Trilha ${index + 1}`,
        y: parseFloat(mediaVel.toFixed(2)),
      });

      dadosVelocidadeAceleracaoFormatados[2].data.push({
        x: `Trilha ${index + 1}`,
        y: parseFloat(mediaTensao.toFixed(2)),
      });

      dadosVelocidadeTempoFormatados.push(bodyVelocidadeTempo);
    });

    // Emitir os dados formatados
    this.server.emit('velocidade-tempo-data', dadosVelocidadeTempoFormatados);
    this.server.emit(
      'velocidade-aceleracao-data',
      dadosVelocidadeAceleracaoFormatados,
    );
  }

  // {
  //   name: "Trilha 1",
  //   data: [
  //     { x: 5400000, y: 54 },
  //     { x: 12660000, y: 17 },
  //     { x: 9180000, y: 26 },
  //   ],
  // },

  // formatDataForChart(dados: any) {
  //   const formattedData = [];
  //   const startTime = new Date(dados[0].createdAt).getTime();

  //   dados.forEach((dado) => {
  //     formattedData.push(dado.velocidadeInstantanea.toFixed(2));
  //   });

  //   return formattedData;
  // }
}
