import { Module } from '@nestjs/common';
import { PostgresGameManagerController } from './postgres-game-manager.controller';

@Module({
  imports: [],
  controllers: [PostgresGameManagerController],
  providers: [],
})
export class PostgresGameManagerModule {}
