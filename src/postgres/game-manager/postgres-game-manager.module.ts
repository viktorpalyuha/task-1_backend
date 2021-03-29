import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from './entities/game.entity';
import { Category } from './entities/category.entity';
import { GameService } from './game/game.service';
import { CategoryService } from './category/category.service';
import { GameModule } from './game/game.module';
import { CategoryModule } from './category/category.module';
import { Module } from '@nestjs/common';
import { PostgresGameManagerController } from './postgres-game-manager.controller';
import { PostgresGameManagerService } from './postgres-game-manager.service';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([Category, Game]),
    CategoryModule,
    GameModule,
  ],
  controllers: [PostgresGameManagerController],
  providers: [
    PostgresGameManagerService,
    GameService,
    CategoryService,
    JwtStrategy,
  ],
  exports: [TypeOrmModule],
})
export class PostgresGameManagerModule {}
