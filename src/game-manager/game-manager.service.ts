import { Injectable } from '@nestjs/common';
import { DatasetService } from 'src/dataset/dataset.service';
import { Data } from 'src/interfaces/data.interface';

@Injectable()
export class GameManagerService {
  constructor(private dataset: DatasetService) {}

  getGames(): Data[] {
    return this.dataset.getData();
  }

  getGameByName(name: string): Data[] {
    return this.dataset.getDataByName(name);
  }

  getGamesByCategory(category: string): Data[] {
    return this.dataset.getDataByCategory(category);
  }
}
