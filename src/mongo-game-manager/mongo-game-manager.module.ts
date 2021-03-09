import { Game, GameSchema } from './schemas/game.schema';
import { Module } from '@nestjs/common';
import { MongoGameManagerController } from './mongo-game-manager.controller';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Game.name, schema: GameSchema }]),
  ],
  controllers: [MongoGameManagerController],
})
export class MongoGameManagerModule {}
