import { Injectable } from '@nestjs/common';

export interface HealthResponse {
  status: string;
  timestamp: string;
}

/**
 * AppService — serviços da camada raiz da aplicação.
 * Módulos de negócio serão adicionados em sprints futuros.
 */
@Injectable()
export class AppService {
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
}
