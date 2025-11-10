import { FORBIDDEN, UNAUTHORIZED } from '@messages/responses'
import type { UserRoleType } from '@prisma/client'
import type { FastifyReply, FastifyRequest } from 'fastify'

export function verifyUserRole(allowedRoles: UserRoleType[]) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const { role } = request.user

    if (!role) {
      return await reply.status(UNAUTHORIZED.status).send(UNAUTHORIZED.body)
    }

    if (!allowedRoles.includes(role)) {
      return await reply.status(FORBIDDEN.status).send(FORBIDDEN.body)
    }
  }
}
