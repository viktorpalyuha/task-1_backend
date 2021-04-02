import { Customer } from './../auth/entities/customer.entity';
import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { WsException } from '@nestjs/websockets';
import { AuthService } from './../auth/auth.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ChatService {
  constructor(
    private authService: AuthService,
    @InjectRepository(Message) private messagesRepository: Repository<Message>,
  ) {}

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

  async saveMessage(content: string, author: Customer) {
    const newMessage = await this.messagesRepository.create({
      content,
      author,
    });
    await this.messagesRepository.save(newMessage);
    return newMessage;
  }

  async getAllMessages() {
    return this.messagesRepository.find({
      relations: ['author'],
    });
  }
}
