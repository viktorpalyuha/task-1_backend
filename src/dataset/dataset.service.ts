import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

import { DataDto } from 'src/interfaces/data.dto';

@Injectable()
export class DatasetService {
  public data: DataDto[];

  constructor() {
    this.data = JSON.parse(
      fs
        .readFileSync(path.join(__dirname, '..', '..', 'steamData.json'))
        .toString(),
    );
  }

  getData(): DataDto[] {
    return this.data;
  }

  getDataByName(name: string): DataDto[] {
    return this.data.filter((game: DataDto) =>
      game.name.toLowerCase().includes(name.toLowerCase()),
    );
  }

  getDataByCategory(category: string): DataDto[] {
    return this.data.filter((game: DataDto) =>
      game.categories.toLowerCase().includes(category.toLowerCase()),
    );
  }

  sortDataByLowPrice(): DataDto[] {
    const dataCopy = [...this.data];
    return dataCopy.sort((a: DataDto, b: DataDto) => a.price - b.price);
  }

  sortDataByHighPrice(): DataDto[] {
    const dataCopy = [...this.data];
    return dataCopy.sort((a: DataDto, b: DataDto) => b.price - a.price);
  }
}
