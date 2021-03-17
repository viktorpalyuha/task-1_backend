import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';

import { Game } from './../entities/game.entity';
import { Category } from '../entities/category.entity';
@Injectable()
export class GameService {
  constructor(
    @InjectRepository(Game)
    private gamesRepository: Repository<Game>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {
    this.gamesRepository.find().then((games: Game[]) => {
      if (!games.length) {
        this.insertGames();
      }
    });
  }

  insertGames() {
    const allGames = JSON.parse(
      fs
        .readFileSync(path.join(__dirname, '..', '..', '..', 'steamData.json'))
        .toString(),
    );

    allGames.map((game, i: number) => {
      //Inserting values to game table
      this.gamesRepository
        .createQueryBuilder()
        .insert()
        .into(Game)
        .values({
          name: game.name,
          img_url: game.img_url,
          developer: game.developer,
          price: game.price,
        })
        .execute()
        .then(() => {
          //Searching for appropriate entities in CategoryRepository and setting the relation
          const splittedCategories = game.categories.split(' ');

          splittedCategories.map(async (category: string) => {
            const selectCategoryQuery = await this.categoryRepository
              .createQueryBuilder()
              .select('category')
              .from(Category, 'category')
              .where(`category.name = :name`, { name: category })
              .getOne();

            this.gamesRepository
              .createQueryBuilder()
              .relation(Game, 'categories')
              .of(i + 1)
              .add(selectCategoryQuery);
          });
        });
    });

    // this.gamesRepository
    //   .createQueryBuilder()
    //   .insert()
    //   .into(Game)
    //   .values(allGames)
    //   .execute();
  }
}
