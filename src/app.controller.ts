import { DatasetService } from './dataset/dataset.service';
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Data } from './interfaces/data.interface';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private dataset: DatasetService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/games')
  getData(): Data[] {
    return this.dataset.getData();
  }
}
