// Nest JS
import { Module } from '@nestjs/common/decorators/modules/module.decorator';

// Controllers
import { AppController } from './app.controller';

// Services
import { AppService } from './app.service';

@Module({
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
