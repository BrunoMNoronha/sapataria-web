import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  /**
   * outputFileTracingRoot é necessário em monorepos pnpm para que o Next.js
   * rastreie corretamente os arquivos de dependência durante o build.
   * Aponta para a raiz do monorepo (dois níveis acima de apps/web).
   */
  outputFileTracingRoot: path.join(__dirname, '../../'),

  /**
   * Pacotes locais do monorepo que precisam ser transpilados pelo Next.js.
   */
  transpilePackages: ['@sapataria/shared'],

  /**
   * Suprime o aviso de origens de desenvolvimento cruzadas.
   * Permite acesso local de outros dispositivos na mesma rede durante o dev.
   */
  allowedDevOrigins: ['*'],
};

export default nextConfig;
