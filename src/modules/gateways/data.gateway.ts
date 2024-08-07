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
import { Server, Socket } from 'socket.io';
import { DataService } from 'src/queue/src/modules/data/data.service';
import { GraficosService } from '../graficos/graficos.service';

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
    private graficosService: GraficosService,
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

  async sendData() {
    const [response, line] = await Promise.all([
      this.graficosService.formatarDadosGraficos(),
      this.graficosService.getDataLine(),
    ]);

    this.server.emit(
      'velocidade-tempo-data',
      response.data.dadosVelocidadeTempoFormatados,
    );
    this.server.emit(
      'velocidade-aceleracao-data',
      response.data.dadosVelocidadeAceleracaoFormatados,
    );

    this.server.emit('trilhas', response.data.dadosTrilhas);
    this.server.emit('line', line.data);
  }
}
