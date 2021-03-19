import { DataDto } from './../interfaces/data.dto';
import { CategoryStatsDto } from './../mongo-game-manager/interfaces/aggregate/categoryStats.dto';
import { PriceStatsDto } from './../mongo-game-manager/interfaces/aggregate/priceStats.dto';
import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PostgresGameManagerService } from './postgres-game-manager.service';

@ApiTags('v3')
@Controller('games')
export class PostgresGameManagerController {
  constructor(private postgresGameManagerService: PostgresGameManagerService) {}

  @Get()
  getData(): Promise<DataDto[]> {
    return this.postgresGameManagerService.getGames();
  }

  @Get('/sort')
  sortGamesByPrice(@Query('from') from: string): Promise<DataDto[]> {
    if (from === 'low') {
      return this.postgresGameManagerService.sortGamesByLowPrice();
    } else {
      return this.postgresGameManagerService.sortGamesByHighPrice();
    }
  }

  @Get('/search/:name')
  getGameByName(@Param('name') name: string): Promise<DataDto[]> {
    return this.postgresGameManagerService.getGameByName(name);
  }

  @Get('/category/:category')
  getGamesByCategory(@Param('category') category: string): Promise<DataDto[]> {
    return this.postgresGameManagerService.getGamesByCategory(category);
  }

  @Get('/statistics')
  getStatistics(@Query() query): Promise<PriceStatsDto[] | CategoryStatsDto[]> {
    const { category, price } = query;

    if (category) {
      return this.postgresGameManagerService.getStatsByCategory(category);
    } else if (price) {
      return this.postgresGameManagerService.getGamesInPriceRange(price);
    } else {
      return this.postgresGameManagerService.getTotalAveragePrice();
    }
  }
}
