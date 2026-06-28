import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Prefixo global da API — todos os endpoints ficam em /api/*
  app.setGlobalPrefix('api');

  // Habilita CORS para o frontend local em desenvolvimento
  app.enableCors({
    origin: process.env.NEXT_PUBLIC_API_URL
      ? [process.env.NEXT_PUBLIC_API_URL.replace('/api', '')]
      : ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true,
  });

  const port = parseInt(process.env.API_PORT ?? '3001', 10);
  await app.listen(port);

  console.log(`\n🚀 API rodando em: http://localhost:${port}/api`);
  console.log(`🏥 Health check:   http://localhost:${port}/api/health\n`);
}

bootstrap();
