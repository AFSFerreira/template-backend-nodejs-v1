import type { FastifyRequest } from 'fastify'
import { getClientIp } from './get-client-ip'

export function rateLimitKeyGenerator(request: FastifyRequest) {
  if (request.user?.sub) {
    return `user:${request.user.sub}`
  }

  return `ip:${getClientIp(request)}`
}
