import { Module } from '@nestjs/common';
import { MongoGameManagerController } from './mongo-game-manager.controller';

@Module({
  controllers: [MongoGameManagerController],
})
export class MongoGameManagerModule {}
