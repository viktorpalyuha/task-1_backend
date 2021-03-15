import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DataDto } from 'src/interfaces/data.dto';
import { GameManagerService } from './game-manager.service';

@ApiTags('v1')
@Controller('games')
export class GameManagerController {
  constructor(private gameManagerService: GameManagerService) {}

  @Get()
  getData(): DataDto[] {
    return this.gameManagerService.getGames();
  }

  @Get('/sort')
  sortGamesByPrice(@Query('from') from: string): DataDto[] {
    if (from === 'low') {
      return this.gameManagerService.sortGamesByLowPrice();
    } else {
      return this.gameManagerService.sortGamesByHighPrice();
    }
  }

  @Get('/search/:name')
  getGameByName(@Param('name') name: string): DataDto[] {
    return this.gameManagerService.getGameByName(name);
  }

  @Get('/category/:category')
  getGamesByCategory(@Param('category') category: string): DataDto[] {
    return this.gameManagerService.getGamesByCategory(category);
  }
}
