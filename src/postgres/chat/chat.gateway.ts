import { WsJwtGuard } from './../auth/strategies/socket.strategy';
import { ChatService } from './chat.service';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Req, UseGuards } from '@nestjs/common';

@WebSocketGateway({ transports: ['websocket'] })
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  constructor(private chatService: ChatService) {}

  @SubscribeMessage('sendMessage')
  @UseGuards(WsJwtGuard)
  async messagesListener(@MessageBody() message: string, @Req() req) {
    const { customer } = req;
    const newMessage = await this.chatService.saveMessage(message, customer);
    this.server.sockets.emit('receivedMessage', {
      ...newMessage,
    });
  }

  @SubscribeMessage('requestAllMessages')
  @UseGuards(WsJwtGuard)
  async getAllMessages(@ConnectedSocket() socket: Socket) {
    const allMessages = await this.chatService.getAllMessages();

    socket.emit('sendAllMessages', allMessages);
  }

  @SubscribeMessage('requestUserFullName')
  @UseGuards(WsJwtGuard)
  async getConnectedUserName(@Req() req, @ConnectedSocket() socket: Socket) {
    const { full_name } = req.customer;

    socket.emit('sendUserFullName', full_name);
  }
}
