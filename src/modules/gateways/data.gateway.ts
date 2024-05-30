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

@WebSocketGateway({ transports: ['websocket'] })
export class DataGateway
  implements OnGatewayConnection, OnGatewayInit, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  handleConnection(client: Socket) {
    console.log('Cliente conectado: ', client.id);
  }

  handleDisconnect(client: Socket) {
    console.log('Cliente desconectado: ', client.id);
  }

  afterInit(server: any) {
    console.log('servidor iniciado');
    // console.log(server);
  }

  @SubscribeMessage('data')
  newData(client: Socket, @MessageBody() body: any) {
    console.log(body);
  }
}
