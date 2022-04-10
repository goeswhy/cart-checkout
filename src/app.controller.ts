import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { AppInfoResponse } from './app-info.response';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAppInfo(): AppInfoResponse {
    return this.appService.getServiceInformation();
  }
}
