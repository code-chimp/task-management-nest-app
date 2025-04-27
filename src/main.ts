import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DEFAULT_PORT } from './constants';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT ?? DEFAULT_PORT);
}

void bootstrap();
