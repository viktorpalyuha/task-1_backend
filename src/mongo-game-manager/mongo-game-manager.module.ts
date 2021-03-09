import { Game, GameSchema } from './schemas/game.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MongoGameManagerController } from './mongo-game-manager.controller';
import { MongoGameManagerService } from './mongo-game-manager.service';
import { MongoDatasetService } from './mongo-dataset/mongo-dataset.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Game.name, schema: GameSchema }]),
  ],
  controllers: [MongoGameManagerController],
  providers: [MongoGameManagerService, MongoDatasetService],
})
export class MongoGameManagerModule {}
