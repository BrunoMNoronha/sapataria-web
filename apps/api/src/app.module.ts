import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    /**
     * ConfigModule carrega variáveis de ambiente.
     * Busca o .env primeiro na raiz do monorepo (../../.env),
     * depois no diretório local (apps/api/.env).
     * isGlobal: true torna o ConfigService disponível em todos os módulos.
     */
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['../../.env', '.env'],
    }),
    /**
     * PrismaModule disponibiliza o PrismaService para a camada de controllers/services.
     * Bootstrap: usado apenas para health check de conexão com o banco nesta fase.
     */
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

