import { PostgresGameManagerModule } from '../postgres-game-manager.module';
import { forwardRef, Module } from '@nestjs/common';

@Module({
  imports: [forwardRef(() => PostgresGameManagerModule)],
  providers: [],
  controllers: [],
})
export class GameModule {}
