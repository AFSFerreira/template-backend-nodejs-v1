import type { FastifyRequest } from 'fastify'
import { getRequestUserPublicIdOptional } from '@services/http/get-request-user-public-id-optional'
import { getClientIp } from './get-client-ip'

export function rateLimitKeyGenerator(request: FastifyRequest) {
  const userPublicId = getRequestUserPublicIdOptional(request)

  if (userPublicId) {
    return `user:${userPublicId}`
  }

  return `ip:${getClientIp(request)}`
}
