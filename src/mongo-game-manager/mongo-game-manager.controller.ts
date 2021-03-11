import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Aggregate } from 'mongoose';

import { CategoryStatsDto } from './interfaces/aggregate/categoryStats.dto';
import { GameDto } from './interfaces/game.dto';
import { PriceStatsDto } from './interfaces/aggregate/priceStats.dto';
import { MongoGameManagerService } from './mongo-game-manager.service';

@ApiTags('v2')
@Controller('games')
export class MongoGameManagerController {
  constructor(private mongoGameManagerService: MongoGameManagerService) {}

  @Get()
  getData(): Promise<GameDto[]> {
    return this.mongoGameManagerService.getGames();
  }

  @Get('/sort')
  sortGamesByPrice(@Query('from') from: string): Promise<GameDto[]> {
    if (from === 'low') {
      return this.mongoGameManagerService.sortGamesByLowPrice();
    } else {
      return this.mongoGameManagerService.sortGamesByHighPrice();
    }
  }

  @Get('/search/:name')
  getGameByName(@Param('name') name: string): Promise<GameDto[]> {
    return this.mongoGameManagerService.getGameByName(name);
  }

  @Get('/category/:category')
  getGamesByCategory(@Param('category') category: string): Promise<GameDto[]> {
    return this.mongoGameManagerService.getGamesByCategory(category);
  }

  @Get('/statistics')
  getStatistics(
    @Query() query,
  ): Aggregate<CategoryStatsDto[] | PriceStatsDto[]> {
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
