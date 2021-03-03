import { Controller, Get, Param } from '@nestjs/common';
import { Data } from 'src/interfaces/data.interface';
import { GameManagerService } from './game-manager.service';

@Controller('games')
export class GameManagerController {
  constructor(private gameManagerService: GameManagerService) {}

  @Get()
  getData(): Data[] {
    return this.gameManagerService.getGames();
  }

  @Get('/game/:name')
  getGameByName(@Param('name') name: string): Data[] {
    return this.gameManagerService.getGameByName(name);
  }

  @Get('/gamesCategory/:category')
  getGamesByCategory(@Param('category') category: string): Data[] {
    return this.gameManagerService.getGamesByCategory(category);
  }
}
