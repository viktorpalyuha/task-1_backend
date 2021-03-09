import { Global, Module } from '@nestjs/common';
import { RouterModule } from 'nest-router';
import { AppService } from './app.service';

import { routes } from './app-routing.module';
import { DatasetService } from './dataset/dataset.service';
import { GameManagerService } from './game-manager/game-manager.service';
import { GameManagerModule } from './game-manager/game-manager.module';
import { MongoGameManagerModule } from './mongo-game-manager/mongo-game-manager.module';

@Global()
@Module({
  imports: [
    RouterModule.forRoutes(routes),
    GameManagerModule,
    MongoGameManagerModule,
  ],
  providers: [AppService, DatasetService, GameManagerService],
  exports: [DatasetService, GameManagerService]
})
export class AppModule {}
