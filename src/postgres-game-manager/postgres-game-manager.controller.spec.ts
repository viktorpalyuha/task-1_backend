import { Test, TestingModule } from '@nestjs/testing';
import { PostgresGameManagerController } from './postgres-game-manager.controller';

describe('PostgresGameManagerController', () => {
  let controller: PostgresGameManagerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostgresGameManagerController],
    }).compile();

    controller = module.get<PostgresGameManagerController>(PostgresGameManagerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
