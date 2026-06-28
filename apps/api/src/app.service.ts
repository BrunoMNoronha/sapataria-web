import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

export interface HealthResponse {
  status: string;
  timestamp: string;
}

export interface DbHealthResponse {
  status: 'ok' | 'error';
  dbConnected: boolean;
  message: string;
  timestamp: string;
}

/**
 * AppService — serviços da camada raiz da aplicação.
 * Módulos de negócio serão adicionados em sprints futuros.
 */
@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Retorna o status de saúde da API.
   * Utilizado pelo endpoint GET /api/health.
   */
  getHealth(): HealthResponse {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * Testa a conexão com o banco de dados via Prisma.
   * Utilizado pelo endpoint GET /api/health/db.
   * Não expõe credenciais — apenas informa se a conexão está disponível.
   */
  async getDbHealth(): Promise<DbHealthResponse> {
    try {
      await this.prisma.$queryRaw`SELECT 1`;
      return {
        status: 'ok',
        dbConnected: true,
        message: 'Banco de dados conectado e respondendo.',
        timestamp: new Date().toISOString(),
      };
    } catch {
      return {
        status: 'error',
        dbConnected: false,
        message:
          'Banco de dados indisponível. Verifique se o PostgreSQL está em execução e o DATABASE_URL está configurado corretamente no .env.',
        timestamp: new Date().toISOString(),
      };
    }
  }
}
