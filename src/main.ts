import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: 'http://localhost:3001', credentials: true });
  app.setGlobalPrefix('/api');
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.APP_PORT ? process.env.APP_PORT : 3000);
}
bootstrap();
