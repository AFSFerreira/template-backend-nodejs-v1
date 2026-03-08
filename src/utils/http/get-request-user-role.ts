import type { FastifyRequest } from 'fastify'
import { MissingUserInfoError } from '@use-cases/errors/generic/missing-user-info-error'

export function getRequestUserRole(request: FastifyRequest) {
  if (!request.user) {
    throw new MissingUserInfoError()
  }
  return request.user.role
}
