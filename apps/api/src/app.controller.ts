import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

/**
 * Controller raiz da API.
 * Rotas:
 *   GET /api/health    — verifica status da API
 *   GET /api/health/db — verifica status da conexão com o banco de dados
 */
@Controller('health')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHealth() {
    return this.appService.getHealth();
  }

  @Get('db')
  async getDbHealth() {
    return this.appService.getDbHealth();
  }
}
