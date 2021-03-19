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

  }
}
