import { FORBIDDEN } from '@messages/responses/common-responses.ts/4xx'
import type { UserRoleType } from '@prisma/generated/enums'
import { getRequestUserRole } from '@services/http/get-request-user-role'
import type { FastifyReply, FastifyRequest } from 'fastify'

export function verifyUserRole(allowedRoles: Set<UserRoleType>) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const role = getRequestUserRole(request)

    if (!allowedRoles.has(role)) {
      return await reply.status(FORBIDDEN.status).send(FORBIDDEN.body)
    }
  }
}
