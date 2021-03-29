import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from './category.service';
import { Category } from '../entities/category.entity';
import { Repository } from 'typeorm';

describe('CategoryService', () => {
  let service: CategoryService;
  let categoryRepo: Repository<Category>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        {
          provide: getRepositoryToken(Category),
          useClass: Repository,
        },
      ],
    }).compile();

    categoryRepo = module.get<Repository<Category>>(
      getRepositoryToken(Category),
    );
    service = module.get<CategoryService>(CategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it("should return array of categories onModuleInit and insertGames shouldn't be called", () => {
    jest
      .spyOn(categoryRepo, 'find')
      .mockResolvedValue([{ id: 1, name: 'dasdasd' }]);
    service.onModuleInit();
    jest.spyOn(service, 'insertCategories').mockReturnValue();

    expect(service.insertCategories).toBeCalledTimes(0);
  });

  it('should return array of categories', async () => {
    const mockedReturnValue = 'czxqweasd';
    const expectedArray = ['czxqweasd', 'czxqweasd', 'czxqweasd'];
    const receivedArray = [];
    jest.spyOn(Array, 'from').mockReturnValueOnce(expectedArray);

    const createQueryBuilder: any = {
      insert: () => createQueryBuilder,
      into: () => createQueryBuilder,
      values: () => createQueryBuilder,
      onConflict: () => createQueryBuilder,
      execute: () => receivedArray.push(mockedReturnValue),
    };

    jest
      .spyOn(categoryRepo, 'createQueryBuilder')
      .mockImplementation(() => createQueryBuilder);

    service.insertCategories();

    expect(receivedArray).toEqual(expectedArray);
  });
});
