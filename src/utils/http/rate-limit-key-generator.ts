import type { FastifyRequest } from 'fastify'
import { getRequestUserPublicIdOptional } from '@utils/http/get-request-user-public-id-optional'
import { getClientIp } from './get-client-ip'

/**
 * Gera a chave de identificação para rate limiting.
 *
 * Prioriza o `publicId` do usuário autenticado (formato `user:<publicId>`).
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
  const userPublicId = getRequestUserPublicIdOptional(request)

  if (userPublicId) {
    return `user:${userPublicId}`
  }

  return `ip:${getClientIp(request)}`
}
