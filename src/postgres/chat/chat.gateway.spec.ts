import { Message } from './entities/message.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ChatService } from './chat.service';
import { WsJwtGuard } from './../auth/strategies/socket.strategy';
import { Test, TestingModule } from '@nestjs/testing';
import { ChatGateway } from './chat.gateway';
import { Repository } from 'typeorm';
import * as io from 'socket.io-client';

describe('ChatGateway', () => {
  let gateway: ChatGateway;
  let chatService: ChatService;
  const mockServer = new io('http://localhost:3000');
  const mockedMessage: Message = {
    id: 2,
    content: 'Test',
    author: {
      id: 3,
      full_name: 'John K',
      email: 'johnk@gmail.com',
      environment: 'local',
    },
    time: '123',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChatGateway,
        ChatService,
        {
          provide: getRepositoryToken(Message),
          useClass: Repository,
        },
      ],
    })
      .overrideGuard(WsJwtGuard)
      .useValue({ canActivate: () => true })
      .compile();

    chatService = module.get<ChatService>(ChatService);
    gateway = module.get<ChatGateway>(ChatGateway);
    gateway.server = mockServer;
    gateway.server.sockets = await mockServer.connect(`http://localhost:3000`);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });

  it('should emit message to all sockets', async () => {
    jest.spyOn(chatService, 'saveMessage').mockResolvedValue(mockedMessage);

    spyOn(gateway.server.sockets, 'emit');

    await gateway.messagesListener('mockedSocket', {
      customer: { full_name: 'Viktor Palyuha' },
    });

    expect(gateway.server.sockets.emit).toHaveBeenCalledWith(
      'receivedMessage',
      {
        ...mockedMessage,
      },
    );
  });

  it('should return all messages and emit', async () => {
    const mockedSocket = await mockServer.connect(`http://localhost:3000`);

    jest
      .spyOn(chatService, 'getAllMessages')
      .mockResolvedValue([mockedMessage]);

    jest.spyOn(mockedSocket, 'emit');

    await gateway.getAllMessages(mockedSocket);

    expect(mockedSocket.emit).toHaveBeenCalledWith('sendAllMessages', [
      mockedMessage,
    ]);
  });

  it('should return user full name and emit', async () => {
    const mockedSocket = await mockServer.connect(`http://localhost:3000`);

    jest.spyOn(mockedSocket, 'emit');

    await gateway.getConnectedUserName(
      { customer: { full_name: 'Viktor Palyuha' } },
      mockedSocket,
    );

    expect(mockedSocket.emit).toHaveBeenCalledWith(
      'sendUserFullName',
      'Viktor Palyuha',
    );
  });
});
