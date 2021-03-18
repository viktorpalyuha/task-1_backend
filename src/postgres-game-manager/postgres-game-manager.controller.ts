import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('v3')
@Controller('games')
export class PostgresGameManagerController {}
