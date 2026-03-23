import type { IController } from '@custom-types/utils/http/adapt-route'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { logger } from '@lib/pino'
import { INVALID_OR_EXPIRED_TOKEN } from '@messages/responses/user-responses/4xx'
import { buildAuthTokens } from '@utils/http/build-auth-tokens'
import { getRequestUserId } from '@utils/http/get-request-user-public-id'
import { getRequestUserRole } from '@utils/http/get-request-user-role'
import { singleton } from 'tsyringe'

@singleton()
export class RefreshTokenController implements IController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    try {
      await request.jwtVerify({ onlyCookie: true })
    } catch (error: unknown) {
      logger.debug({ error })
      return await reply.sendApiResponse(INVALID_OR_EXPIRED_TOKEN)
    }

    const { accessToken, reply: replyWithCookie } = await buildAuthTokens({
      reply,
      id: getRequestUserId(request),
      payload: {
        role: getRequestUserRole(request),
      },
    })

    const formattedReply = { accessToken }

    return await replyWithCookie.sendResponse(formattedReply)
  }
}
