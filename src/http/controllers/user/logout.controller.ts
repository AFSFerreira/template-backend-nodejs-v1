import { env } from '@env/index'
import { logger } from '@lib/logger'
import { INVALID_OR_EXPIRED_TOKEN, LOGOUT } from '@messages/responses'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function logout(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify({ onlyCookie: true })
  } catch (error) {
    if (error instanceof Error) {
      logger.debug(INVALID_OR_EXPIRED_TOKEN.body)
      return await reply.status(INVALID_OR_EXPIRED_TOKEN.status).send(INVALID_OR_EXPIRED_TOKEN.body)
    }
  }

  return await reply
    .clearCookie('refreshToken', {
      path: '/',
      secure: env.NODE_ENV === 'production',
      sameSite: env.NODE_ENV === 'production' ? 'strict' : 'lax',
      httpOnly: true,
    })
    .status(LOGOUT.status)
    .send(LOGOUT.body)
}
