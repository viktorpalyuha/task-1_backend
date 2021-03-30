import { ChatModule } from './postgres/chat/chat.module';
import { AuthModule } from './postgres/auth/auth.module';
import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RouterModule } from 'nest-router';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';

import { routes } from './app-routing.module';
import { GameManagerModule } from './game-manager/game-manager.module';
import { MongoGameManagerModule } from './mongo-game-manager/mongo-game-manager.module';

import { AppService } from './app.service';
import { PostgresGameManagerModule } from './postgres/game-manager/postgres-game-manager.module';
@Global()
@Module({
  imports: [
    RouterModule.forRoutes(routes),
    ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/shop', {
      useNewUrlParser: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    GameManagerModule,
    MongoGameManagerModule,
    PostgresGameManagerModule,
    AuthModule,
    ChatModule,
  ],
  providers: [AppService],
})
export class AppModule {}
