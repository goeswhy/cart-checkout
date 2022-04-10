import { Injectable } from '@nestjs/common';
import { AppInfoResponse } from './app-info.response';

@Injectable()
export class AppService {
  getServiceInformation(): AppInfoResponse {
    return {
      name: process.env.npm_package_name,
      version: process.env.npm_package_version,
    }
  }
}
