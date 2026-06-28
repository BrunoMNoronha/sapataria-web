import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

/**
 * PrismaService — encapsula o PrismaClient para injeção de dependência no NestJS.
 * Gerencia o ciclo de vida da conexão com o banco de dados.
 * Bootstrap: usado apenas para health check de conexão nesta fase.
 */
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);

  async onModuleInit() {
    try {
      await this.$connect();
      this.logger.log('Conexão com o banco de dados estabelecida.');
    } catch (err) {
      this.logger.warn('Banco de dados indisponível na inicialização. A API seguirá funcionando.');
      this.logger.debug(err);
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
