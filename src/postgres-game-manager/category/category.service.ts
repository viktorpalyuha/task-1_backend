import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';

import { Category } from '../entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {
    this.categoriesRepository.find().then((categories) => {
      if (!categories.length) {
        this.insertCategories();
      }
    });
  }

  insertCategories(): void {
    const allCategories = Array.from(
      new Set(
        JSON.parse(
          fs
            .readFileSync(
              path.join(__dirname, '..', '..', '..', 'steamData.json'),
            )
            .toString(),
        )
          .map((game) => game.categories.split(' '))
          .flat(),
      ),
    );

    allCategories.map((category: string) => {
      this.categoriesRepository
        .createQueryBuilder()
        .insert()
        .into(Category)
        .values({ name: category })
        .onConflict('DO NOTHING')
        .execute();
    });
  }
}
