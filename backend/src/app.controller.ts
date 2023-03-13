// Nest JS
import { Body, Controller, Post } from '@nestjs/common/decorators';

// Services
import { AppService } from './app.service';

// DTO
import { VerifyRequestDto, VerifyResponseDto } from './types/dto/verify';

@Controller('verify')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  async verify(
    @Body() verifyDto: VerifyRequestDto,
  ): Promise<VerifyResponseDto> {
    return this.appService.verify(verifyDto);
  }
}
