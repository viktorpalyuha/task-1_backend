import { Injectable } from '@nestjs/common';
import { DatasetService } from 'src/dataset/dataset.service';
import { DataDto } from 'src/interfaces/data.dto';

@Injectable()
export class GameManagerService {
  constructor(private dataset: DatasetService) {}

  getGames(): DataDto[] {
    return this.dataset.getData();
  }

  getGameByName(name: string): DataDto[] {
    return this.dataset.getDataByName(name);
  }

  getGamesByCategory(category: string): DataDto[] {
    return this.dataset.getDataByCategory(category);
  }

  sortGamesByLowPrice(): DataDto[] {
    return this.dataset.sortDataByLowPrice();
  }

  sortGamesByHighPrice(): DataDto[] {
    return this.dataset.sortDataByHighPrice();
  }
}
