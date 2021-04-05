import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { ChatService } from './chat.service';
import { Message } from './entities/message.entity';
import { Repository } from 'typeorm';

describe('ChatService', () => {
  let service: ChatService;
  let messageRepo: Repository<Message>;
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
        ChatService,
        {
          provide: getRepositoryToken(Message),
          useClass: Repository,
        },
      ],
    }).compile();

    messageRepo = module.get<Repository<Message>>(getRepositoryToken(Message));
    service = module.get<ChatService>(ChatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return created message', async () => {
    jest.spyOn(messageRepo, 'create').mockReturnValue(mockedMessage);
    jest.spyOn(messageRepo, 'save').mockResolvedValue(mockedMessage);

    const x = await service.saveMessage('test', {
      id: 3,
      full_name: 'John K',
      email: 'johnk@gmail.com',
      environment: 'local',
    });

    expect(x).toEqual(mockedMessage);
  });

  it('should return array of found messages', async () => {
    jest.spyOn(messageRepo, 'find').mockResolvedValue([mockedMessage]);

    const x = await service.getAllMessages();

    expect(x).toEqual([mockedMessage]);
  });
});
