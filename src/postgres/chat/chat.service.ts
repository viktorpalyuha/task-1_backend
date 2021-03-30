import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { WsException } from '@nestjs/websockets';
import { AuthService } from './../auth/auth.service';

@Injectable()
export class ChatService {
  constructor(private authService: AuthService) {}

  async getUserFromSocket(socket: Socket) {
    const authHeader = socket.handshake.headers.authorization;
    const user = await this.authService.getUserFromAuthenticationToken(
      authHeader,
    );
    if (!user) {
      throw new WsException('Invalid credentials.');
    }
    return user;
  }
}
