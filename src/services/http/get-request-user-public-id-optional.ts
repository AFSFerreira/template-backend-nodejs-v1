import type { FastifyRequest } from 'fastify'

export function getRequestUserPublicIdOptional(request: FastifyRequest): string | null {
  return request.user?.sub
}
