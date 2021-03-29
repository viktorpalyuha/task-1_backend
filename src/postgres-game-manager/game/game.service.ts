import { DataDto } from './../../interfaces/data.dto';
import { CategoryStatsDto } from './../../mongo-game-manager/interfaces/aggregate/categoryStats.dto';
import { PriceStatsDto } from './../../mongo-game-manager/interfaces/aggregate/priceStats.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';

import { Game } from './../entities/game.entity';
import { Category } from '../entities/category.entity';
@Injectable()
export class GameService {
  constructor(
    @InjectRepository(Game)
    private gamesRepository: Repository<Game>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {
    this.gamesRepository.find().then((games: Game[]) => {
      if (!games.length) {
        this.insertGames();
      }
    });
  }

  insertGames(): void {
    const allGames = JSON.parse(
      fs
        .readFileSync(path.join(__dirname, '..', '..', '..', 'steamData.json'))
        .toString(),
    );

    allGames.map((game, i: number) => {
      //Inserting values to game table
      this.gamesRepository
        .createQueryBuilder()
        .insert()
        .into(Game)
        .values(game)
        .execute()
        .then(() => {
          //Searching for appropriate entities in CategoryRepository and setting the relation
          const splittedCategories = game.categories.split(' ');

          splittedCategories.map(async (category: string) => {
            const selectCategoryQuery = await this.categoryRepository
              .createQueryBuilder()
              .select('category')
              .from(Category, 'category')
              .where(`category.name = :name`, { name: category })
              .getOne();

            this.gamesRepository
              .createQueryBuilder()
              .relation(Game, 'categories')
              .of(i + 1)
              .add(selectCategoryQuery);
          });
        });
    });
  }

  async getData(): Promise<DataDto[]> {
    const allGames = await this.gamesRepository
      .createQueryBuilder('game')
      .leftJoinAndSelect('game.categories', 'category')
      .select([
        'game.name',
        'game.img_url',
        'game.developer',
        'game.price',
        'category.name',
      ])
      .getMany();

    return allGames.map(
      (game: Game): DataDto => {
        return {
          ...game,
          categories: game.categories
            .map((category) => category.name)
            .join(' '),
        };
      },
    );
  }

  async getDataByName(name: string): Promise<DataDto[]> {
    const receivedGamesByName = await this.gamesRepository
      .createQueryBuilder('game')
      .where('game.name iLIKE :name', { name: `%${name}%` })
      .leftJoinAndSelect('game.categories', 'category')
      .select([
        'game.name',
        'game.img_url',
        'game.developer',
        'game.price',
        'category.name',
      ])
      .getMany();

    return receivedGamesByName.map(
      (game: Game): DataDto => {
        return {
          ...game,
          categories: game.categories
            .map((category) => category.name)
            .join(' '),
        };
      },
    );
  }

  async getDataByCategory(category: string): Promise<DataDto[]> {
    const gamesByCategory = await this.gamesRepository
      .createQueryBuilder('game')
      .where('category.name IN (:name)', {
        name: category,
      })
      .leftJoin('game.categories', 'category')
      .select([
        'game.name',
        'game.img_url',
        'game.developer',
        'game.price',
        'category.name',
      ])
      .getMany();

    return gamesByCategory.map(
      (game: Game): DataDto => {
        return {
          ...game,
          categories: game.categories
            .map((category) => category.name)
            .join(' '),
        };
      },
    );
  }

  async sortDataByLowPrice(): Promise<DataDto[]> {
    const sortedGamesByLow = await this.gamesRepository
      .createQueryBuilder('game')
      .leftJoinAndSelect('game.categories', 'category')
      .select([
        'game.name',
        'game.img_url',
        'game.developer',
        'game.price',
        'category.name',
      ])
      .orderBy({ price: 'ASC' })
      .getMany();

    return sortedGamesByLow.map(
      (game: Game): DataDto => {
        return {
          ...game,
          categories: game.categories
            .map((category) => category.name)
            .join(' '),
        };
      },
    );
  }

  async sortDataByHighPrice(): Promise<DataDto[]> {
    const sortedGamesByHigh = await this.gamesRepository
      .createQueryBuilder('game')
      .leftJoinAndSelect('game.categories', 'category')
      .select([
        'game.name',
        'game.img_url',
        'game.developer',
        'game.price',
        'category.name',
      ])
      .orderBy({ price: 'DESC' })
      .getMany();

    return sortedGamesByHigh.map(
      (game: Game): DataDto => {
        return {
          ...game,
          categories: game.categories
            .map((category) => category.name)
            .join(' '),
        };
      },
    );
  }

  getTotalAveragePrice(): Promise<PriceStatsDto[]> {
    return this.gamesRepository
      .createQueryBuilder('game')
      .select('ROUND(AVG(game.price), 2)', 'avgPrice')
      .getRawMany();
  }

  getGamesInPriceRange(range: number): Promise<PriceStatsDto[]> {
    return this.gamesRepository
      .createQueryBuilder('game')
      .where('game.price BETWEEN :startRange AND :finalRange', {
        startRange: +range,
        finalRange: +range + 100,
      })
      .select('COUNT((game))', 'numberOfGames')
      .getRawMany();
  }

  async getStatsByCategory(category: string): Promise<CategoryStatsDto[]> {
    const receivedStats = await this.gamesRepository
      .createQueryBuilder('game')
      .leftJoinAndSelect('game.categories', 'category')
      .where('category.name IN (:name)', {
        name: category,
      })
      .select([
        'COUNT((game)) AS "numberOfGames"',
        'ROUND(AVG(game.price), 2) AS "avgPrice"',
        'MAX(game.price) AS "highestPrice"',
        'MIN(game.price) AS "lowestPrice"',
      ])
      .getRawMany();
    receivedStats.forEach((stats) => (stats.category = category));

    return receivedStats;
  }
}
