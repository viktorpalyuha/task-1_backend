import { Game } from './schemas/game.schema';
import { MongoGameManagerService } from './mongo-game-manager.service';
import { Controller, Get, Param, Query } from '@nestjs/common';

@Controller('games')
export class MongoGameManagerController {
  constructor(private mongoGameManagerService: MongoGameManagerService) {}

  @Get()
  getData(): Promise<Game[]> {
    return this.mongoGameManagerService.getGames();
  }

  @Get('/sort')
  sortGamesByPrice(@Query('from') from): Promise<Game[]> {
    if (from === 'low') {
      return this.mongoGameManagerService.sortGamesByLowPrice();
    } else {
      return this.mongoGameManagerService.sortGamesByHighPrice();
    }
  }

  @Get('/search/:name')
  getGameByName(@Param('name') name: string): Promise<Game[]> {
    return this.mongoGameManagerService.getGameByName(name);
  }

  @Get('/category/:category')
  getGamesByCategory(@Param('category') category: string): Promise<Game[]> {
    return this.mongoGameManagerService.getGamesByCategory(category);
  }

  @Get('/statistics')
  getStatistics(@Query() query): Promise<Game[]> {
    const { category, price } = query;

    if (category) {
      return this.mongoGameManagerService.getStatsByCategory(category);
    } else if (price) {
      return this.mongoGameManagerService.getGamesInPriceRange(price);
    } else {
      return this.mongoGameManagerService.getTotalAveragePrice();
    }
  }
}
