/**
 * Resposta do endpoint GET /api/health/db.
 * Indica se a conexão com o PostgreSQL está disponível.
 * Compartilhado entre apps/api e apps/web.
 */
export interface DbHealthResponse {
  /** 'ok' se conectado, 'error' se indisponível */
  status: 'ok' | 'error';
  /** true se o banco respondeu com sucesso */
  dbConnected: boolean;
  /** Mensagem descritiva do resultado */
  message: string;
  /** Timestamp ISO 8601 do momento da verificação */
  timestamp: string;
}
