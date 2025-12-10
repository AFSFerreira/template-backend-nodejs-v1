import type { FastifyReply, FastifyRequest } from 'fastify'
import { env } from '@env/index'
import { logger } from '@lib/logger'
import { INVALID_OR_EXPIRED_TOKEN, LOGOUT } from '@messages/responses/user-responses'

export async function logout(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify({ onlyCookie: true })
  } catch (_error) {
    logger.debug(INVALID_OR_EXPIRED_TOKEN.body)

    return await reply.status(INVALID_OR_EXPIRED_TOKEN.status).send({ data: INVALID_OR_EXPIRED_TOKEN.body })
  }

  return await reply
    .clearCookie('refreshToken', {
      path: '/',
      secure: env.NODE_ENV === 'production',
      sameSite: env.NODE_ENV === 'production' ? 'strict' : 'lax',
      httpOnly: true,
    })
    .status(LOGOUT.status)
    .send({ data: LOGOUT.body })
}
