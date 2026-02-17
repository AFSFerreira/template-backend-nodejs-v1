import type { FastifyReply, FastifyRequest } from 'fastify'
import { logger } from '@lib/logger'
import { setUserIdStored } from '@lib/logger/helpers/set-user-id-stored'
import { UNAUTHORIZED } from '@messages/responses/common-responses/4xx'
import { getRequestUserPublicId } from '@services/http/get-request-user-public-id'
import { verifyUserMembershipStatus } from '@utils/http/verify-user-membership-status'

export async function verifyJwt(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify()
    setUserIdStored(getRequestUserPublicId(request))
  } catch (error: unknown) {
    logger.debug({ error })
    return await reply.status(UNAUTHORIZED.status).send(UNAUTHORIZED.body)
  }

  const errorResponse = verifyUserMembershipStatus(request)

  if (errorResponse) {
    return await reply.status(errorResponse.status).send(errorResponse.body)
  }
}
