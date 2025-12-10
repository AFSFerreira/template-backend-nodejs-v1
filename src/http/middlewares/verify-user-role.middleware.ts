import type { UserRoleType } from '@prisma/client'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { FORBIDDEN, UNAUTHORIZED } from '@messages/responses/common-responses'

export function verifyUserRole(allowedRoles: Set<UserRoleType>) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const { role } = request.user

    if (!role) {
      return await reply.status(UNAUTHORIZED.status).send(UNAUTHORIZED.body)
    }

    if (!allowedRoles.has(role)) {
      return await reply.status(FORBIDDEN.status).send(FORBIDDEN.body)
    }
  }
}
