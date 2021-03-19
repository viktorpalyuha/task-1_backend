import { Injectable } from '@nestjs/common';
import { GameService } from './game/game.service';

import { Game } from './entities/game.entity';
@Injectable()
export class PostgresGameManagerService {
  constructor(private gameService: GameService) {}

  getGames(): Promise<Game[]> {
    return this.gameService.getData();
  }

  getGameByName(name: string): Promise<Game[]> {
    return this.gameService.getDataByName(name);
  }

  getGamesByCategory(category: string): Promise<Game[]> {
    return this.gameService.getDataByCategory(category);
  }

  sortGamesByLowPrice(): Promise<Game[]> {
    return this.gameService.sortDataByLowPrice();
  }

  sortGamesByHighPrice(): Promise<Game[]> {
    return this.gameService.sortDataByHighPrice();
  }

  getTotalAveragePrice() {
    return this.gameService.getTotalAveragePrice();
  }

  getGamesInPriceRange(range: number) {
    return this.gameService.getGamesInPriceRange(range);
  }

  getStatsByCategory(category: string) {
    return this.gameService.getStatsByCategory(category);
  }
}
