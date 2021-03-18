import { Injectable } from '@nestjs/common';
import { GameService } from './game/game.service';

import { Game } from './entities/game.entity';
@Injectable()
export class PostgresGameManagerService {
  constructor(private gameService: GameService) {}

  getGames(): Promise<Game[]> {
    return this.gameService.getData();
  }

  // getGameByName(name: string): Promise<GameDto[]> {
  //   return this.mongoDataset.getDataByName(name);
  // }

  // getGamesByCategory(category: string): Promise<GameDto[]> {
  //   return this.mongoDataset.getDataByCategory(category);
  // }

  // sortGamesByLowPrice(): Promise<GameDto[]> {
  //   return this.mongoDataset.sortDataByLowPrice();
  // }

  // sortGamesByHighPrice(): Promise<GameDto[]> {
  //   return this.mongoDataset.sortDataByHighPrice();
  // }

  // getTotalAveragePrice(): Aggregate<PriceStatsDto[]> {
  //   return this.mongoDataset.getTotalAveragePrice();
  // }

  // getGamesInPriceRange(range: number): Aggregate<PriceStatsDto[]> {
  //   return this.mongoDataset.getGamesInPriceRange(range);
  // }

  // getStatsByCategory(category: string): Aggregate<CategoryStatsDto[]> {
  //   return this.mongoDataset.getStatsByCategory(category);
  // }
}
