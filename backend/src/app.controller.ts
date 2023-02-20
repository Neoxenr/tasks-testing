// Nest JS
import { Body, Controller, Post } from '@nestjs/common';

// Services
import { AppService } from './app.service';

// DTO
import { VerifyRequestDto } from './types/dto/verify';

@Controller('verify')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  async verify(@Body() verifyDto: VerifyRequestDto): Promise<any> {
    return this.appService.verify(verifyDto);
  }
}
