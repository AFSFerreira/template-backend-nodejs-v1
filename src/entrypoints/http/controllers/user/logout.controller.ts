import type { IController } from '@custom-types/utils/http/adapt-route'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { env } from '@env/index'
import { logger } from '@lib/pino'
import { LOGOUT } from '@messages/responses/user-responses/2xx'
import { INVALID_OR_EXPIRED_TOKEN } from '@messages/responses/user-responses/4xx'
import { singleton } from 'tsyringe'

@singleton()
export class LogoutController implements IController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    try {
      await request.jwtVerify({ onlyCookie: true })
    } catch (_error) {
      logger.debug(INVALID_OR_EXPIRED_TOKEN.body)

      return await reply.sendApiResponse(INVALID_OR_EXPIRED_TOKEN)
    }

    return await reply
      .clearCookie('refreshToken', {
        path: '/',
        secure: env.NODE_ENV === 'production',
        sameSite: env.NODE_ENV === 'production' ? 'strict' : 'lax',
        httpOnly: true,
      })
      .sendApiResponse(LOGOUT)
  }
}
