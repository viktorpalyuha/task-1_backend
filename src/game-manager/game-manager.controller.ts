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

  @Get(':name')
  getGameByName(@Param('name') name: string): Data[] {
    return this.gameManagerService.getGameByName(name);
  }
}
