import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { GameService } from './game.service';
import { getRepositoryToken } from '@nestjs/typeorm';

import { Category } from './../entities/category.entity';
import { Game } from './../entities/game.entity';
describe('GameService', () => {
  let service: GameService;
  let gameRepo: Repository<Game>;
  let categoryRepo: Repository<Category>;
  const mockedGames: Game[] = [
    {
      id: 1,
      name: 'gasdas',
      img_url: 'dasdad',
      developer: 'dasdad',
      price: 2,
      categories: [
        {
          id: 1,
          name: 'dasdad',
        },
      ],
    },
    {
      id: 2,
      name: 'john',
      img_url: 'dasdad',
      developer: 'dasdad',
      price: 3,
      categories: [
        {
          id: 1,
          name: 'dasdad',
        },
      ],
    },
    {
      id: 3,
      name: 'john',
      img_url: 'dasdad',
      developer: 'dasdad',
      price: 3,
      categories: [
        {
          id: 1,
          name: 'dasdad',
        },
      ],
    },
    {
      id: 4,
      name: 'john',
      img_url: 'dasdad',
      developer: 'dasdad',
      price: 101,
      categories: [
        {
          id: 1,
          name: 'dasdad',
        },
      ],
    },
    {
      id: 5,
      name: 'czxcq',
      img_url: 'dasdad',
      developer: 'dasdad',
      price: 2031,
      categories: [
        {
          id: 1,
          name: 'dasdad',
        },
      ],
    },
    {
      id: 6,
      name: 'zbvasd',
      img_url: 'dasdad',
      developer: 'dasdad',
      price: 53,
      categories: [
        {
          id: 1,
          name: 'dasdad',
        },
      ],
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GameService,
        {
          provide: getRepositoryToken(Game),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Category),
          useClass: Repository,
        },
      ],
    }).compile();
    gameRepo = module.get<Repository<Game>>(getRepositoryToken(Game));
    categoryRepo = module.get<Repository<Category>>(
      getRepositoryToken(Category),
    );
    service = new GameService(gameRepo, categoryRepo);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it("should return array of games onModuleInit and insertGames shouldn't be called", () => {
    const findReceivedGames = jest
      .spyOn(gameRepo, 'find')
      .mockResolvedValue(mockedGames);

    jest.spyOn(service, 'insertGames').mockImplementation(() => 'works');
    service.onModuleInit();
    if (!findReceivedGames) {
      service.insertGames();
    }

    expect(service.insertGames).toBeCalledTimes(0);
  });

  describe('getData', () => {
    it('should return all games', async () => {
      const mappedGames = mockedGames.map((game) => {
        return {
          ...game,
          categories: game.categories
            .map((category) => category.name)
            .join(' '),
        };
      });

      const createQueryBuilder: any = {
        leftJoinAndSelect: () => createQueryBuilder,
        select: () => createQueryBuilder,
        getMany: () => mockedGames,
      };

      jest
        .spyOn(gameRepo, 'createQueryBuilder')
        .mockImplementation(() => createQueryBuilder);

      await expect(service.getData()).resolves.toEqual(mappedGames);
    });
  });

  describe('getDataByName', () => {
    it('should return games by provided name', async () => {
      const name = 'john';

      const filteredGames = mockedGames.filter((game) =>
        game.name.includes(name),
      );

      const mappedGames = filteredGames.map((game) => {
        return {
          ...game,
          categories: game.categories
            .map((category) => category.name)
            .join(' '),
        };
      });

      const createQueryBuilder: any = {
        select: () => createQueryBuilder,
        where: () => createQueryBuilder,
        leftJoinAndSelect: () => createQueryBuilder,
        getMany: () => filteredGames,
      };

      jest
        .spyOn(gameRepo, 'createQueryBuilder')
        .mockImplementation(() => createQueryBuilder);

      await expect(service.getDataByName(name)).resolves.toEqual(mappedGames);
    });
  });

  describe('getDataByCategory', () => {
    it('should return games by provided category', async () => {
      const categoryProvided = 'dasdad';

      const filteredGames = mockedGames.filter((game) =>
        game.categories.map((category) =>
          category.name.includes(categoryProvided),
        ),
      );

      const mappedGames = filteredGames.map((game) => {
        return {
          ...game,
          categories: game.categories
            .map((category) => category.name)
            .join(' '),
        };
      });

      const createQueryBuilder: any = {
        where: () => createQueryBuilder,
        leftJoin: () => createQueryBuilder,
        select: () => createQueryBuilder,
        getMany: () => filteredGames,
      };

      jest
        .spyOn(gameRepo, 'createQueryBuilder')
        .mockImplementation(() => createQueryBuilder);

      await expect(
        service.getDataByCategory(categoryProvided),
      ).resolves.toEqual(mappedGames);
    });
  });

  describe('sortDataByLowPrice', () => {
    it('should return games sorted by low price', async () => {
      const filteredGames = mockedGames.sort(
        (gameA, gameB) => gameB.price - gameA.price,
      );

      const mappedGames = filteredGames.map((game) => {
        return {
          ...game,
          categories: game.categories
            .map((category) => category.name)
            .join(' '),
        };
      });

      const createQueryBuilder: any = {
        leftJoinAndSelect: () => createQueryBuilder,
        select: () => createQueryBuilder,
        orderBy: () => createQueryBuilder,
        getMany: () => filteredGames,
      };

      jest
        .spyOn(gameRepo, 'createQueryBuilder')
        .mockImplementation(() => createQueryBuilder);

      await expect(service.sortDataByLowPrice()).resolves.toEqual(mappedGames);
    });
  });

  describe('sortDataByHighPrice', () => {
    it('should return games sorted by high price', async () => {
      const filteredGames = mockedGames.sort(
        (gameA, gameB) => gameA.price - gameB.price,
      );

      const mappedGames = filteredGames.map((game) => {
        return {
          ...game,
          categories: game.categories
            .map((category) => category.name)
            .join(' '),
        };
      });

      const createQueryBuilder: any = {
        leftJoinAndSelect: () => createQueryBuilder,
        select: () => createQueryBuilder,
        orderBy: () => createQueryBuilder,
        getMany: () => filteredGames,
      };

      jest
        .spyOn(gameRepo, 'createQueryBuilder')
        .mockImplementation(() => createQueryBuilder);

      await expect(service.sortDataByHighPrice()).resolves.toEqual(mappedGames);
    });
  });

  describe('getTotalAveragePrice', () => {
    it('should return total average price', () => {
      const totalAveragePrice = { avgPrice: 0 };

      mockedGames.map((game) => (totalAveragePrice.avgPrice += game.price));

      const createQueryBuilder: any = {
        select: () => createQueryBuilder,
        getRawMany: () => totalAveragePrice,
      };

      jest
        .spyOn(gameRepo, 'createQueryBuilder')
        .mockImplementation(() => createQueryBuilder);

      expect(service.getTotalAveragePrice()).toEqual(totalAveragePrice);
    });
  });

  describe('getGamesInPriceRange', () => {
    it('should return numberOfGames in price range', () => {
      const games = { numberOfGames: 0 };
      const range = 1;
      mockedGames.map((game) =>
        game.price >= range
          ? games.numberOfGames++
          : game.price <= range + 100
          ? games.numberOfGames++
          : null,
      );

      const createQueryBuilder: any = {
        where: () => createQueryBuilder,
        select: () => createQueryBuilder,
        getRawMany: () => games,
      };

      jest
        .spyOn(gameRepo, 'createQueryBuilder')
        .mockImplementation(() => createQueryBuilder);

      expect(service.getGamesInPriceRange(range)).toEqual(games);
    });
  });

  describe('getStatsByCategory', () => {
    it('should return statistics by category', async () => {
      const providedCategory = 'dasdad';
      const mockedStats = [
        {
          numberOfGames: 0,
          avgPrice: 0,
          highestPrice: 0,
          lowestPrice: 0,
          category: providedCategory,
        },
      ];

      const filteredGamesByCategory = mockedGames.filter((game) =>
        game.categories.map((category) =>
          category.name.includes(providedCategory),
        ),
      );
      const allPrices = filteredGamesByCategory.map((game) => game.price);

      mockedStats[0].numberOfGames = filteredGamesByCategory.length;
      mockedStats[0].avgPrice =
        allPrices.reduce((acc, value) => acc + value, 0) /
        filteredGamesByCategory.length;
      mockedStats[0].highestPrice = Math.max(...allPrices);
      mockedStats[0].lowestPrice = Math.min(...allPrices);

      const createQueryBuilder: any = {
        leftJoinAndSelect: () => createQueryBuilder,
        where: () => createQueryBuilder,
        select: () => createQueryBuilder,
        getRawMany: () => mockedStats,
      };

      jest
        .spyOn(gameRepo, 'createQueryBuilder')
        .mockImplementation(() => createQueryBuilder);

      await expect(
        service.getStatsByCategory(providedCategory),
      ).resolves.toEqual(mockedStats);
    });
  });
});
