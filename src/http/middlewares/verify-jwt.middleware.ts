import type { FastifyReply, FastifyRequest } from 'fastify'
import { logger } from '@lib/logger'
import { setUserId } from '@lib/logger/helpers/set-user-id'
import { UNAUTHORIZED } from '@messages/responses/common-responses.ts/4xx'
import { getRequestUserPublicId } from '@services/http/get-request-user-public-id'
import { verifyUserMembershipStatus } from '@utils/http/verify-user-membership-status'

export async function verifyJwt(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify()
    setUserId(getRequestUserPublicId(request))
  } catch (_error: unknown) {
    logger.debug(UNAUTHORIZED.body)
    return await reply.status(UNAUTHORIZED.status).send(UNAUTHORIZED.body)
  }

  const errorResponse = verifyUserMembershipStatus(request)

  if (errorResponse) {
    return await reply.status(errorResponse.status).send(errorResponse.body)
  }
}
