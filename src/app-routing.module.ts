import { Routes } from 'nest-router';
import { GameManagerModule } from './game-manager/game-manager.module';
import { MongoGameManagerModule } from './mongo-game-manager/mongo-game-manager.module';
import { PostgresGameManagerModule } from './postgres-game-manager/postgres-game-manager.module';

export const routes: Routes = [
  {
    path: '/v1',
    module: GameManagerModule,
  },
  {
    path: '/v2',
    module: MongoGameManagerModule,
  },
  {
    path: '/v3',
    module: PostgresGameManagerModule,
  },
];
