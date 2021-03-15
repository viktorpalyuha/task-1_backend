import { Test, TestingModule } from '@nestjs/testing';
import { MongoGameManagerController } from './mongo-game-manager.controller';

describe('MongoGameManagerController', () => {
  let controller: MongoGameManagerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MongoGameManagerController],
    }).compile();

    controller = module.get<MongoGameManagerController>(MongoGameManagerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
