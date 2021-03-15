import { Injectable } from '@nestjs/common';

import { MongoDatasetService } from './mongo-dataset/mongo-dataset.service';
import { Game } from './schemas/game.schema';
@Injectable()
export class MongoGameManagerService {
  constructor(private mongoDataset: MongoDatasetService) {}

  getGames(): Promise<Game[]> {
    return this.mongoDataset.getData();
  }

  getGameByName(name: string): Promise<Game[]> {
    return this.mongoDataset.getDataByName(name);
  }

  getGamesByCategory(category: string): Promise<Game[]> {
    return this.mongoDataset.getDataByCategory(category);
  }

  sortGamesByLowPrice(): Promise<Game[]> {
    return this.mongoDataset.sortDataByLowPrice();
  }

  sortGamesByHighPrice(): Promise<Game[]> {
    return this.mongoDataset.sortDataByHighPrice();
  }

  getTotalAveragePrice(): Promise<Game[]> {
    return this.mongoDataset.getTotalAveragePrice();
  }

  getGamesInPriceRange(range: string): Promise<Game[]> {
    return this.mongoDataset.getGamesInPriceRange(range);
  }

  getStatsByCategory(category: string): Promise<Game[]> {
    return this.mongoDataset.getStatsByCategory(category);
  }
}
