import { Controller, Get } from '@nestjs/common';

@Controller('games')
export class MongoGameManagerController {
  @Get()
  sayHello(): string {
    return 'Versioning works';
  }
}
