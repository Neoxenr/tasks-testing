import { Body, Controller, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { VerifyDto } from './dto/verify.dto';

@Controller('verify')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post(':userId/:taskId')
  async verify(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Param('taskId', ParseUUIDPipe) taskId: string,
    @Body() verifyDto: VerifyDto,
  ): Promise<any> {
    return this.appService.verify(userId, taskId, verifyDto);
  }
}
