import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NextModule } from '@nestpress/next/dist';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.get(NextModule).prepare();
  await app.listen(3000);
}
bootstrap();
