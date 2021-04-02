import { WsJwtGuard } from './../auth/strategies/socket.strategy';
import { ChatService } from './chat.service';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Req, UseGuards } from '@nestjs/common';

@WebSocketGateway({ transports: ['websocket'] })
export class ChatGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  constructor(private chatService: ChatService) {}

  async handleConnection(socket: Socket) {
    const user = await this.chatService.getCustomerFromSocket(socket);
    !user && socket.disconnect();
  }

  @SubscribeMessage('sendMessage')
  @UseGuards(WsJwtGuard)
  async messagesListener(
    @MessageBody() message: string,
    @Req() req,
    @ConnectedSocket() socket: Socket,
  ) {
    const { customer } = req;

    this.server.sockets.emit('receivedMessage', {
      message,
      customer,
    });
  }
}
