import type { FastifyReply, FastifyRequest } from 'fastify'
import { logger } from '@lib/logger'
import { INVALID_OR_EXPIRED_TOKEN } from '@messages/responses/user-responses/4xx'
import { buildAuthTokens } from '@services/http/build-auth-tokens'
import { getRequestUserPublicId } from '@services/http/get-request-user-public-id'
import { getRequestUserRole } from '@services/http/get-request-user-role'
import { getRequestUserStatus } from '@services/http/get-request-user-status'

export async function refreshToken(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify({ onlyCookie: true })
  } catch (error: unknown) {
    logger.debug({ error })
    return await reply.status(INVALID_OR_EXPIRED_TOKEN.status).send({ data: INVALID_OR_EXPIRED_TOKEN.body })
  }

  const { accessToken, reply: replyWithCookie } = await buildAuthTokens({
    reply,
    publicId: getRequestUserPublicId(request),
    payload: {
      role: getRequestUserRole(request),
      status: getRequestUserStatus(request),
    },
  })

  return await replyWithCookie.status(200).send({
    data: {
      accessToken,
    },
  })
}
