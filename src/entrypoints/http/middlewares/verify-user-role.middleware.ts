import type { UserRoleType } from '@prisma/generated/enums'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { FORBIDDEN } from '@messages/responses/common-responses/4xx'
import { getRequestUserRole } from '@utils/http/get-request-user-role'

export function verifyUserRole(allowedRoles: Set<UserRoleType>) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const role = getRequestUserRole(request)

    if (!allowedRoles.has(role)) {
      return await reply.status(FORBIDDEN.status).send(FORBIDDEN.body)
    }
  }
}
