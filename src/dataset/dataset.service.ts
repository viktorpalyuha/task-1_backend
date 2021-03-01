import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

import { Data } from 'src/interfaces/data.interface';

@Injectable()
export class DatasetService {
  public data: Data[];

  constructor() {
    this.data = JSON.parse(
      fs
        .readFileSync(path.join(__dirname, '..', '..', 'steamData.json'))
        .toString(),
    );
  }

  getData(): Data[] {
    return this.data;
  }
}
