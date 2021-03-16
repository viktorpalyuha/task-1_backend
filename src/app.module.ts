import { Global, Module } from '@nestjs/common';
import { RouterModule } from 'nest-router';
import { MongooseModule } from '@nestjs/mongoose';

import { routes } from './app-routing.module';
import { GameManagerModule } from './game-manager/game-manager.module';
import { MongoGameManagerModule } from './mongo-game-manager/mongo-game-manager.module';

import { AppService } from './app.service';
import { PostgresGameManagerModule } from './postgres-game-manager/postgres-game-manager.module';
@Global()
@Module({
  imports: [
    RouterModule.forRoutes(routes),
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/shop', {
      useNewUrlParser: true,
    }),
    GameManagerModule,
    MongoGameManagerModule,
    PostgresGameManagerModule,
  ],
  providers: [AppService],
})
export class AppModule {}
