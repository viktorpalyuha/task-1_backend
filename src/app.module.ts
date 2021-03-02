import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatasetService } from './dataset/dataset.service';
import { GameManagerController } from './game-manager/game-manager.controller';
import { GameManagerService } from './game-manager/game-manager.service';

@Module({
  imports: [],
  controllers: [AppController, GameManagerController],
  providers: [AppService, DatasetService, GameManagerService],
})
export class AppModule {}
