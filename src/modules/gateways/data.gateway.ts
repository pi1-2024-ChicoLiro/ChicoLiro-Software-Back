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

@WebSocketGateway({ transports: ['websocket'] })
export class DataGateway
  implements OnGatewayConnection, OnGatewayInit, OnGatewayDisconnect
{
  constructor(private dataQueueService: DataService) {}
  @WebSocketServer() server: Server;

  handleConnection(client: Socket) {
    console.log('Cliente conectado: ', client.id);
  }

  handleDisconnect(client: Socket) {
    console.log('Cliente desconectado: ', client.id);
  }

  afterInit() {
    console.log('servidor iniciado');
  }

  @SubscribeMessage('data')
  newData(client: Socket, @MessageBody() body: any) {
    this.dataQueueService.handleData(body);
  }

  sendData(@MessageBody() body: any) {
    this.server.emit('get-data', body);
  }
}
