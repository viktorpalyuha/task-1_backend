import { Module } from '@nestjs/common';
import { PostgresGameManagerController } from './postgres-game-manager.controller';
import { PostgresGameManagerService } from './postgres-game-manager.service';

@Module({
  imports: [],
  controllers: [PostgresGameManagerController],
  providers: [PostgresGameManagerService],
})
export class PostgresGameManagerModule {}
