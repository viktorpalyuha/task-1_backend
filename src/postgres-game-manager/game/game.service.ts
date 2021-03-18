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
        .values({
          name: game.name,
          img_url: game.img_url,
          developer: game.developer,
          price: game.price,
        })
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

    // this.gamesRepository
    //   .createQueryBuilder()
    //   .insert()
    //   .into(Game)
    //   .values(allGames)
    //   .execute();
  }

  async getData(): Promise<Game[]> {
    return this.gamesRepository.find({ relations: ['categories'] });
  }

  // async getDataByName(name: string): Promise<Game[]> {
  //   return this.gamesRepository.find({ name: { $regex: name, $options: 'i' } });
  // }

  // async getDataByCategory(category: string): Promise<Game[]> {
  //   return this.gamesRepository.find({
  //     categories: { $regex: category, $options: 'i' },
  //   });
  // }

  // async sortDataByLowPrice(): Promise<Game[]> {
  //   return this.gamesRepository.find().sort({ price: 1 });
  // }

  // async sortDataByHighPrice(): Promise<Game[]> {
  //   return this.gamesRepository.find().sort({ price: -1 });
  // }

  // getTotalAveragePrice(): Aggregate<PriceStatsDto[]> {
  //   return this.gameModel.aggregate([
  //     { $group: { _id: null, avgPrice: { $avg: '$price' } } },
  //     { $project: { _id: 0, avgPrice: { $round: ['$avgPrice', 2] } } },
  //   ]);
  // }

  // getGamesInPriceRange(range: number): Aggregate<PriceStatsDto[]> {
  //   return this.gameModel.aggregate([
  //     { $match: { price: { $gte: +range, $lte: +range + 100 } } },
  //     { $count: 'numberOfGames' },
  //   ]);
  // }

  // getStatsByCategory(category: string): Aggregate<CategoryStatsDto[]> {
  //   return this.gameModel.aggregate([
  //     { $match: { categories: { $regex: category, $options: 'i' } } },
  //     {
  //       $group: {
  //         _id: null,
  //         numberOfGames: { $sum: 1 },
  //         avgPrice: { $avg: '$price' },
  //         highestPrice: { $max: '$price' },
  //         lowestPrice: { $min: '$price' },
  //       },
  //     },
  //     {
  //       $project: {
  //         _id: 0,
  //         category: category,
  //         numberOfGames: 1,
  //         avgPrice: { $round: ['$avgPrice', 2] },
  //         highestPrice: 1,
  //         lowestPrice: 1,
  //       },
  //     },
  //   ]);
  // }
}
