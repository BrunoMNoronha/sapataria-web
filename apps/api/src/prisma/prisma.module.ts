import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

/**
 * PrismaModule — disponibiliza o PrismaService para outros módulos.
 * Exporta o PrismaService para que possa ser injetado em qualquer módulo que importar PrismaModule.
 */
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
