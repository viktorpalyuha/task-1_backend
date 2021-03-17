import { GameModule } from './game/game.module';
import { CategoryModule } from './category/category.module';
import { Module } from '@nestjs/common';
import { PostgresGameManagerController } from './postgres-game-manager.controller';
import { PostgresGameManagerService } from './postgres-game-manager.service';

@Module({
  imports: [CategoryModule, GameModule],
  controllers: [PostgresGameManagerController],
  providers: [PostgresGameManagerService],
})
export class PostgresGameManagerModule {}
