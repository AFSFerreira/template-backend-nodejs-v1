import type { FastifyReply, FastifyRequest } from 'fastify'
import { logger } from '@lib/pino'
import { INVALID_OR_EXPIRED_TOKEN } from '@messages/responses/user-responses/4xx'
import { buildAuthTokens } from '@utils/http/build-auth-tokens'
import { getRequestUserPublicId } from '@utils/http/get-request-user-public-id'
import { getRequestUserRole } from '@utils/http/get-request-user-role'
import { getRequestUserStatus } from '@utils/http/get-request-user-status'
import { StatusCodes } from 'http-status-codes'

export async function refreshToken(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify({ onlyCookie: true })
  } catch (error: unknown) {
    logger.debug({ error })
    return await reply.sendApiResponse(INVALID_OR_EXPIRED_TOKEN)
  }

  const { accessToken, reply: replyWithCookie } = await buildAuthTokens({
    reply,
    publicId: getRequestUserPublicId(request),
    payload: {
      role: getRequestUserRole(request),
      status: getRequestUserStatus(request),
    },
  })

  return await replyWithCookie.status(StatusCodes.OK).send({
    data: {
      accessToken,
    },
  })
}
