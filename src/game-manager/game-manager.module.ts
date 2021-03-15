import { Module } from '@nestjs/common';

import { GameManagerController } from './game-manager.controller';
import { DatasetService } from 'src/dataset/dataset.service';
import { GameManagerService } from './game-manager.service';
@Module({
  controllers: [GameManagerController],
  providers: [DatasetService, GameManagerService],
})
export class GameManagerModule {}
