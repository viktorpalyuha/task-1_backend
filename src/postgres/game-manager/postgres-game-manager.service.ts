import { CategoryStatsDto } from '../../mongo-game-manager/interfaces/aggregate/categoryStats.dto';
import { PriceStatsDto } from '../../mongo-game-manager/interfaces/aggregate/priceStats.dto';
import { DataDto } from '../../interfaces/data.dto';
import { Injectable } from '@nestjs/common';
import { GameService } from './game/game.service';

@Injectable()
export class PostgresGameManagerService {
  constructor(private gameService: GameService) {}

  getGames(): Promise<DataDto[]> {
    return this.gameService.getData();
  }

  getGameByName(name: string): Promise<DataDto[]> {
    return this.gameService.getDataByName(name);
  }

  getGamesByCategory(category: string): Promise<DataDto[]> {
    return this.gameService.getDataByCategory(category);
  }

  sortGamesByLowPrice(): Promise<DataDto[]> {
    return this.gameService.sortDataByLowPrice();
  }

  sortGamesByHighPrice(): Promise<DataDto[]> {
    return this.gameService.sortDataByHighPrice();
  }

  getTotalAveragePrice(): Promise<PriceStatsDto[]> {
    return this.gameService.getTotalAveragePrice();
  }

  getGamesInPriceRange(range: number): Promise<PriceStatsDto[]> {
    return this.gameService.getGamesInPriceRange(range);
  }

  getStatsByCategory(category: string): Promise<CategoryStatsDto[]> {
    return this.gameService.getStatsByCategory(category);
  }
}
