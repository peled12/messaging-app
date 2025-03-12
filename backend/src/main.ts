import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exeption.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // apply the global exception filter
  app.useGlobalFilters(new HttpExceptionFilter());

  app.enableCors({
    origin: process.env.FRONTEND_URL,
    methods: 'POST, GET, PATCH, PUT, DELETE',
  });

  const port = process.env.PORT || 5050; // default port

  await app.listen(port);

  console.log(`🚀 Server is running on: http://localhost:${port}`);
}
bootstrap();
