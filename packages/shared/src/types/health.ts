/**
 * Tipo de resposta do endpoint GET /api/health.
 * Compartilhado entre API e Web para garantir consistência de contrato.
 */
export interface HealthResponse {
  /** Status da aplicação: 'ok' em operação normal */
  status: string;
  /** Timestamp ISO 8601 do momento da verificação */
  timestamp: string;
}
