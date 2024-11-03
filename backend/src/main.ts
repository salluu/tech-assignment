import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT');
  const frontendUrl = configService.get<string>('FRONTEND_URL');

  if (!port || !frontendUrl) {
    throw new Error('PORT and FRONTEND_URL must be defined in the environment variables');
  }

  // Enable CORS using the FRONTEND_URL from environment variables
  app.enableCors({
    origin: frontendUrl,
    credentials: true,
  });

  // Use cookie-parser middleware
  app.use(cookieParser());

  await app.listen(port);
  console.log(`Backend is running on port ${port}`);
}

bootstrap();
