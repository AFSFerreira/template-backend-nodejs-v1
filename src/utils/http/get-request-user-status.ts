import type { FastifyRequest } from 'fastify'
import { MissingUserInfoError } from '@use-cases/errors/generic/missing-user-info-error'

/**
 * Extrai o status de associação (membership) do usuário autenticado a partir do JWT.
 *
 * @param request - Request do Fastify com JWT decodificado.
 * @returns Status do usuário (ex: `ACTIVE`, `INACTIVE`, `PENDING`, `VERIFYING`).
 * @throws {MissingUserInfoError} Se `request.user` não estiver presente.
 */
export function getRequestUserStatus(request: FastifyRequest) {
  if (!request.user) {
    throw new MissingUserInfoError()
  }
  return request.user.status
}
