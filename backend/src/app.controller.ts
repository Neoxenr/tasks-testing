import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';

export type VerifyDto = {
  repository: string;
  branch: string;
};

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  async verify(@Body() verifyDto: VerifyDto): Promise<any> {
    return this.appService.verify(verifyDto);
  }
}
