import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

/**
 * Controller raiz da API.
 * Rota: GET /api/health
 */
@Controller('health')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHealth() {
    return this.appService.getHealth();
  }
}
