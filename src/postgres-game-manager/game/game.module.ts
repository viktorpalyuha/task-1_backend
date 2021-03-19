import { Category } from './../entities/category.entity';
import { Game } from '../entities/game.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameService } from './game.service';

@Module({
  imports: [TypeOrmModule.forFeature([Game, Category])],
  providers: [GameService],
  controllers: [],
})
export class GameModule {}
