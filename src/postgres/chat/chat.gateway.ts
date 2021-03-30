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

@WebSocketGateway({
  origins: ['http://localhost:4200'],

  handlePreflightRequest: (_, res) => {
    res.writeHead(200, {
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Methods': 'GET,POST',
      'Access-Control-Allow-Headers': 'authorization',
      'Access-Control-Allow-Credentials': true,
    });
    res.end();
  },
})
export class ChatGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  constructor(private chatService: ChatService) {}

  async handleConnection(socket: Socket) {
    await this.chatService.getUserFromSocket(socket);
  }

  @SubscribeMessage('sendMessage')
  async messagesListener(
    @MessageBody() message: string,
    @ConnectedSocket() socket: Socket,
  ) {
    const { full_name } = await this.chatService.getUserFromSocket(socket);

    this.server.sockets.emit('receivedMessage', {
      message,
      full_name,
    });
  }
}
