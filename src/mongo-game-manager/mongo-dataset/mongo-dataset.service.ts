import { Aggregate, Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as fs from 'fs';
import * as path from 'path';

import { Game, GameDocument } from './../schemas/game.schema';
import { PriceStatsDto } from './../interfaces/aggregate/priceStats.dto';
import { GameDto } from './../interfaces/game.dto';
import { CategoryStatsDto } from '../interfaces/aggregate/categoryStats.dto';

@Injectable()
export class MongoDatasetService {
  constructor(@InjectModel(Game.name) private gameModel: Model<GameDocument>) {
    this.clearDataBase();
    this.parseJSONIntoDataBase();
  }

  async clearDataBase() {
    await this.gameModel.deleteMany({});
  }

  async parseJSONIntoDataBase() {
    await this.gameModel.insertMany(
      JSON.parse(
        fs
          .readFileSync(
            path.join(__dirname, '..', '..', '..', 'steamData.json'),
          )
          .toString(),
      ),
    );
  }

  async getData(): Promise<GameDto[]> {
    return this.gameModel.find();
  }

  async getDataByName(name: string): Promise<GameDto[]> {
    return this.gameModel.find({ name: { $regex: name, $options: 'i' } });
  }

  async getDataByCategory(category: string): Promise<GameDto[]> {
    return this.gameModel.find({
      categories: { $regex: category, $options: 'i' },
    });
  }

  async sortDataByLowPrice(): Promise<GameDto[]> {
    return this.gameModel.find().sort({ price: 1 });
  }

  async sortDataByHighPrice(): Promise<GameDto[]> {
    return this.gameModel.find().sort({ price: -1 });
  }

  getTotalAveragePrice(): Aggregate<PriceStatsDto[]> {
    return this.gameModel.aggregate([
      { $group: { _id: null, avgPrice: { $avg: '$price' } } },
      { $project: { _id: 0, avgPrice: { $round: ['$avgPrice', 2] } } },
    ]);
  }

  getGamesInPriceRange(range: number): Aggregate<PriceStatsDto[]> {
    return this.gameModel.aggregate([
      { $match: { price: { $gte: +range, $lte: +range + 100 } } },
      { $count: 'numberOfGames' },
    ]);
  }

  getStatsByCategory(category: string): Aggregate<CategoryStatsDto[]> {
    return this.gameModel.aggregate([
      { $match: { categories: { $regex: category, $options: 'i' } } },
      {
        $group: {
          _id: null,
          numberOfGames: { $sum: 1 },
          avgPrice: { $avg: '$price' },
          highestPrice: { $max: '$price' },
          lowestPrice: { $min: '$price' },
        },
      },
      {
        $project: {
          _id: 0,
          category: category,
          numberOfGames: 1,
          avgPrice: { $round: ['$avgPrice', 2] },
          highestPrice: 1,
          lowestPrice: 1,
        },
      },
    ]);
  }
}
