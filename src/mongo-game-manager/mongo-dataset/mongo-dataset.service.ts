import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as fs from 'fs';
import * as path from 'path';

import { Game, GameDocument } from './../schemas/game.schema';

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

  async getData(): Promise<Game[]> {
    return await this.gameModel.find();
  }

  async getDataByName(name: string): Promise<Game[]> {
    return await this.gameModel.find({ name: { $regex: name, $options: 'i' } });
  }

  async getDataByCategory(category: string): Promise<Game[]> {
    return await this.gameModel.find({
      categories: { $regex: category, $options: 'i' },
    });
  }

  async sortDataByLowPrice(): Promise<Game[]> {
    return await this.gameModel.find().sort({ price: 1 });
  }

  async sortDataByHighPrice(): Promise<Game[]> {
    return await this.gameModel.find().sort({ price: -1 });
  }

  async getTotalAveragePrice(): Promise<Game[]> {
    return await this.gameModel.aggregate([
      { $group: { _id: null, avgPrice: { $avg: '$price' } } },
      { $project: { _id: 0, avgPrice: 1 } },
    ]);
  }

  async getGamesInPriceRange(range: string): Promise<Game[]> {
    if (range === '1-100') {
      return await this.gameModel.aggregate([
        { $match: { price: { $gte: 1, $lte: 100 } } },
        { $count: 'numberOfGames' },
      ]);
    } else if (range === '100-499') {
      return await this.gameModel.aggregate([
        { $match: { price: { $gte: 100, $lte: 499 } } },
        { $count: 'numberOfGames' },
      ]);
    } else if (range === '500') {
      return await this.gameModel.aggregate([
        { $match: { price: { $gte: 500 } } },
        { $count: 'numberOfGames' },
      ]);
    }
  }

  async getStatsByCategory(category: string): Promise<Game[]> {
    return await this.gameModel.aggregate([
      { $match: { categories: { $regex: category, $options: 'i' } } },
      {
        $group: {
          _id: null,
          numberOfGames: { $sum: 1 },
          avgPrice: { $avg: '$price' },
          higestPrice: { $max: '$price' },
          lowestPrice: { $min: '$price' },
        },
      },
      { $project: { _id: 0 } },
    ]);
  }
}
