import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exeption.filter';

/*
  TODO: learn from this vid: https://youtu.be/ZLp92Iw0rkI?t=157
  TODO: switch to a different database (to save data from neon)
*/

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // apply the global exception filter
  app.useGlobalFilters(new HttpExceptionFilter());

  const port = process.env.PORT || 5050; // default port

  await app.listen(port);

  console.log(`🚀 Server is running on: http://localhost:${port}`);
}
bootstrap();
