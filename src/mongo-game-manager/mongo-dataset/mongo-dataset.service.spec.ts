import { Test, TestingModule } from '@nestjs/testing';
import { MongoDatasetService } from './mongo-dataset.service';

describe('MongoDatasetService', () => {
  let service: MongoDatasetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MongoDatasetService],
    }).compile();

    service = module.get<MongoDatasetService>(MongoDatasetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
