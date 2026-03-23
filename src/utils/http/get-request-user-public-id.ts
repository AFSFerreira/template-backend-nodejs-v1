import type { FastifyRequest } from 'fastify'
import { MissingUserInfoError } from '@use-cases/errors/generic/missing-user-info-error'

/**
 * Extrai o `id` do usuário autenticado a partir do JWT na request.
 *
 * Lança erro caso o usuário não esteja autenticado (JWT ausente ou inválido).
 * Utilizado em rotas protegidas onde a autenticação é obrigatória.
 *
 * @param request - Request do Fastify com JWT decodificado.
 * @returns `id` (UUIDv7) do usuário autenticado.
 * @throws {MissingUserInfoError} Se `request.user` não estiver presente.
 */
export function getRequestUserId(request: FastifyRequest) {
  if (!request.user) {
    throw new MissingUserInfoError()
  }
  return request.user.sub
}
