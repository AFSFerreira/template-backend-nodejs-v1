import type { FastifyRequest } from 'fastify'
import { MissingUserInfoError } from '@use-cases/errors/generic/missing-user-info-error'

/**
 * Extrai o papel (role) do usuário autenticado a partir do JWT na request.
 *
 * @param request - Request do Fastify com JWT decodificado.
 * @returns Role do usuário (ex: `ADMIN`, `EDITOR`, `USER`).
 * @throws {MissingUserInfoError} Se `request.user` não estiver presente.
 */
export function getRequestUserRole(request: FastifyRequest) {
  if (!request.user) {
    throw new MissingUserInfoError()
  }
  return request.user.role
}
