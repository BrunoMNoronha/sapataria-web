import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
