import { FORBIDDEN, INACTIVE_USER } from '@messages/errors'
import { MembershipStatusType } from '@prisma/client'
import type { UserRoleType } from '@prisma/client'
import type { FastifyReply, FastifyRequest } from 'fastify'

export function verifyUserRole(allowedRoles: UserRoleType[]) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const { role, status } = request.user

    if (status === MembershipStatusType.INACTIVE) {
      return await reply.status(INACTIVE_USER.status).send(INACTIVE_USER.body)
    }

    if (!allowedRoles.includes(role)) {
      return await reply.status(FORBIDDEN.status).send(FORBIDDEN.body)
    }
  }
}
