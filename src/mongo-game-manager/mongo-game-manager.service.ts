import { PriceStatsDto } from './interfaces/aggregate/priceStats.dto';
import { CategoryStatsDto } from './interfaces/aggregate/categoryStats.dto';
import { Injectable } from '@nestjs/common';
import { Aggregate } from 'mongoose';

import { MongoDatasetService } from './mongo-dataset/mongo-dataset.service';
import { GameDto } from './interfaces/game.dto';
@Injectable()
export class MongoGameManagerService {
  constructor(private mongoDataset: MongoDatasetService) {}

  getGames(): Promise<GameDto[]> {
    return this.mongoDataset.getData();
  }

  getGameByName(name: string): Promise<GameDto[]> {
    return this.mongoDataset.getDataByName(name);
  }

  getGamesByCategory(category: string): Promise<GameDto[]> {
    return this.mongoDataset.getDataByCategory(category);
  }
}
