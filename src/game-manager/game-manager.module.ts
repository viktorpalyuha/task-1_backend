import { Module } from '@nestjs/common';
import { GameManagerController } from './game-manager.controller';

@Module({
  controllers: [GameManagerController],
})
export class GameManagerModule {}
