// Nest JS
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

// Modules
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: console });

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  await app.listen(8080);
}
bootstrap();
