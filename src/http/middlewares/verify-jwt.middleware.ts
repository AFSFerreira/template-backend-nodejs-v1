import { logger } from '@lib/logger'
import { setUserId } from '@lib/logger/helpers/set-user-id'
import { INACTIVE_USER, PENDING_USER, UNAUTHORIZED } from '@messages/responses'
import { MembershipStatusType } from '@prisma/client'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function verifyJwt(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify()
    setUserId(request.user.sub)
  } catch (_error: unknown) {
    logger.debug(UNAUTHORIZED.body)
    return await reply.status(UNAUTHORIZED.status).send(UNAUTHORIZED.body)
  }

  const { status } = request.user

  if (status === MembershipStatusType.INACTIVE) {
    return await reply.status(INACTIVE_USER.status).send(INACTIVE_USER.body)
  }

  if (status === MembershipStatusType.PENDING) {
    return await reply.status(PENDING_USER.status).send(PENDING_USER.body)
  }
}
