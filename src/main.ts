import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import { DEFAULT_PORT } from './constants';
import { AppModule } from './app.module';

/**
 * The entry point of the application. Bootstraps the NestJS app, applies global pipes and interceptors,
 * and starts the HTTP server on the configured port.
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger();
  const port = process.env.PORT ?? DEFAULT_PORT;

  app.useGlobalPipes(new ValidationPipe()); // Enables validation for all incoming requests
  app.useGlobalInterceptors(new TransformInterceptor()); // Serializes all responses

  await app.listen(port);
  logger.log(`Application is running on: http://localhost:${port}`);
}

void bootstrap();
