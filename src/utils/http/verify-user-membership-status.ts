import type { IApiResponse } from '@custom-types/responses/api-response'
import type { FastifyRequest } from 'fastify'
import { INACTIVE_USER, PENDING_USER, UNVERIFIED_EMAIL } from '@messages/responses/user-responses/4xx'
import { MembershipStatusType } from '@prisma/generated/enums'
import { getRequestUserStatus } from '@utils/http/get-request-user-status'

/**
 * Verifica o status de associação (membership) do usuário autenticado e retorna
 * a resposta de erro correspondente, se aplicável.
 *
 * Utilizado como guarda em middlewares/hooks de rotas que exigem usuário ativo.
 * Retorna `null` quando o usuário está ativo (sem restrições).
 *
 * @param request - Request do Fastify com usuário autenticado.
 * @returns Resposta de erro para usuários inativos/pendentes/verificando, ou `null` se ativo.
 */
export function verifyUserMembershipStatus(request: FastifyRequest): IApiResponse | null {
  const status = getRequestUserStatus(request)

  switch (status) {
    case MembershipStatusType.INACTIVE:
      return INACTIVE_USER
    case MembershipStatusType.PENDING:
      return PENDING_USER
    case MembershipStatusType.VERIFYING:
      return UNVERIFIED_EMAIL
    default:
      return null
  }
}
