import type { FastifyReply, FastifyRequest } from 'fastify'
import { setUserIdStored } from '@lib/async-local-storage/helpers/set-user-id-stored'
import { logger } from '@lib/pino'
import { UNAUTHORIZED } from '@messages/responses/common-responses/4xx'
import { getRequestUserId } from '@utils/http/get-request-user-public-id'

export async function verifyJwt(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify()
    setUserIdStored(getRequestUserId(request))
  } catch (error: unknown) {
    logger.debug({ error })
    return await reply.status(UNAUTHORIZED.status).send(UNAUTHORIZED.body)
  }
}
