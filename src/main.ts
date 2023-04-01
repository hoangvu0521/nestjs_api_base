import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

// like Express ? Yes
/**
  How to generate a module:
  nest g module "module name"
  We have 2 entries: User and Note, 1 User can write many Notes
  - controller is where to receive request from client
  - controller will call service to do implementations
  Prisma = dependency which connect to dB using ORM(Object Relationship)
  Now add module named "prisma"
  
 */

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3002);
}
bootstrap();
