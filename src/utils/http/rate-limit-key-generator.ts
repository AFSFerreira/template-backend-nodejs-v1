import type { FastifyRequest } from 'fastify'
import { getRequestUserIdOptional } from '@utils/http/get-request-user-public-id-optional'
import { getClientIp } from './get-client-ip'

/**
 * Gera a chave de identificação para rate limiting.
 *
 * Prioriza o `id` do usuário autenticado (formato `user:<id>`).
 * Para requisições não autenticadas, utiliza o IP do cliente (formato `ip:<ipAddress>`).
 *
 * @param request - Request do Fastify.
 * @returns Chave única para identificação do rate limit.
 *
 * @example
 * // Usuário autenticado:
 * rateLimitKeyGenerator(request) // 'user:01912345-abcd-7890-ef12-abcdef123456'
 *
 * // Requisição anônima:
 * rateLimitKeyGenerator(request) // 'ip:192.168.1.100'
 */
export function rateLimitKeyGenerator(request: FastifyRequest) {
  const userId = getRequestUserIdOptional(request)

  if (userId) {
    return `user:${userId}`
  }

  return `ip:${getClientIp(request)}`
}
