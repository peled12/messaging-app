import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters/http-exeption.filter';

/*
  TODO: learn aboaut DTO (or whatever it is)
*/

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Apply the global exception filter
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(process.env.PORT);
}
bootstrap();
