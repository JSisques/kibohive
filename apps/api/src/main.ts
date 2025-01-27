import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Main');
  const app = await NestFactory.create(AppModule);

  // Configuración global
  app.enableCors();
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(new ValidationPipe());

  // Iniciar servidor
  await app.listen(process.env.API_PORT ?? 3000);
  const appUrl = await app.getUrl();
  logger.log(`🚀 Server ready at ${appUrl}`);
}

bootstrap();
