import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as fs from 'fs';
import * as path from 'path';

import { Game, GameDocument } from './../schemas/game.schema';

@Injectable()
export class MongoDatasetService {
  constructor(@InjectModel(Game.name) private gameModel: Model<GameDocument>) {
    this.clearDataBase();
    this.parseJSONIntoDataBase();
  }

  async clearDataBase() {
    await this.gameModel.deleteMany({});
  }

  async parseJSONIntoDataBase() {
    await this.gameModel.insertMany(
      JSON.parse(
        fs
          .readFileSync(
            path.join(__dirname, '..', '..', '..', 'steamData.json'),
          )
          .toString(),
      ),
    );
  }
}
