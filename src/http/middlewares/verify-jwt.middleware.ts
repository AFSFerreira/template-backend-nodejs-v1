import { logger } from '@lib/logger'
import { setUserId } from '@lib/logger/helpers/set-user-id'
import { UNAUTHORIZED } from '@messages/responses/common-responses'
import { INACTIVE_USER, PENDING_USER } from '@messages/responses/user-responses.ts/4xx'
import { MembershipStatusType } from '@prisma/client'
import { getRequestUserPublicId } from '@services/http/get-request-user-public-id'
import { getRequestUserStatus } from '@services/http/get-request-user-status'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function verifyJwt(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify()
    setUserId(getRequestUserPublicId(request))
  } catch (_error: unknown) {
    logger.debug(UNAUTHORIZED.body)
    return await reply.status(UNAUTHORIZED.status).send(UNAUTHORIZED.body)
  }

  const status = getRequestUserStatus(request)

  if (status === MembershipStatusType.INACTIVE) {
    return await reply.status(INACTIVE_USER.status).send(INACTIVE_USER.body)
  }

  if (status === MembershipStatusType.PENDING) {
    return await reply.status(PENDING_USER.status).send(PENDING_USER.body)
  }
}
