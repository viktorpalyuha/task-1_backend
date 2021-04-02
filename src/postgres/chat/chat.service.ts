import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { WsException } from '@nestjs/websockets';
import { AuthService } from './../auth/auth.service';

@Injectable()
export class ChatService {
  constructor(private authService: AuthService) {}

  async getCustomerFromSocket(socket: Socket) {
    const authHeader = socket.handshake.query.authorization;
    const user = await this.authService.getCustomerFromAuthenticationToken(
      authHeader,
    );
    if (!user) {
      throw new WsException('Invalid credentials.');
    }
    return user;
  }
}
