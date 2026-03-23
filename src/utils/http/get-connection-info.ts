import type { FastifyRequest } from 'fastify'

/**
 * Extrai o primeiro valor de um header HTTP que pode ser string ou array.
 *
 * Headers como `User-Agent` podem chegar como array quando há múltiplos valores.
 * Esta função normaliza para sempre retornar uma única string.
 *
 * @param header - Valor do header HTTP.
 * @returns Primeiro valor do header, ou `undefined` se ausente.
 */
function getSingleHeaderValue(header: string | string[] | undefined): string | undefined {
  if (Array.isArray(header)) return header[0]
  return header
}

/**
 * Extrai informações de conexão do cliente a partir da request.
 *
 * Retorna IP, User-Agent e porta remota, úteis para auditoria,
 * logging e detecção de atividades suspeitas.
 *
 * @param request - Request do Fastify.
 * @returns Objeto com `ipAddress`, `browser` (User-Agent) e `remotePort`.
 */
export function getConnectionInfo(request: FastifyRequest) {
  return {
    ipAddress: request.ip,
    browser: getSingleHeaderValue(request.headers['user-agent']),
    remotePort: request.socket.remotePort,
  }
}
