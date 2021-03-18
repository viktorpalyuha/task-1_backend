import { Game } from './entities/game.entity';
import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PostgresGameManagerService } from './postgres-game-manager.service';

@ApiTags('v3')
@Controller('games')
export class PostgresGameManagerController {
  constructor(private postgresGameManagerService: PostgresGameManagerService) {}

  @Get()
  getData(): Promise<Game[]> {
    return this.postgresGameManagerService.getGames();
  }

  // @Get('/sort')
  // sortGamesByPrice(@Query('from') from: string): Promise<Game[]> {
  //   if (from === 'low') {
  //     return this.mongoGameManagerService.sortGamesByLowPrice();
  //   } else {
  //     return this.mongoGameManagerService.sortGamesByHighPrice();
  //   }
  // }

  // @Get('/search/:name')
  // getGameByName(@Param('name') name: string): Promise<GameDto[]> {
  //   return this.mongoGameManagerService.getGameByName(name);
  // }

  // @Get('/category/:category')
  // getGamesByCategory(@Param('category') category: string): Promise<GameDto[]> {
  //   return this.mongoGameManagerService.getGamesByCategory(category);
  // }

  // @Get('/statistics')
  // getStatistics(
  //   @Query() query,
  // ): Aggregate<CategoryStatsDto[] | PriceStatsDto[]> {
  //   const { category, price } = query;

  //   if (category) {
  //     return this.mongoGameManagerService.getStatsByCategory(category);
  //   } else if (price) {
  //     return this.mongoGameManagerService.getGamesInPriceRange(price);
  //   } else {
  //     return this.mongoGameManagerService.getTotalAveragePrice();
  //   }
  // }
}
