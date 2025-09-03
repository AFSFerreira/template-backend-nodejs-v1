import { env } from '@env/index'
import { INVALID_OR_EXPIRED_TOKEN } from '@messages/errors'
import { LOGOUT } from '@messages/info'
import type { FastifyRequest, FastifyReply } from 'fastify'

export async function logout(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify({ onlyCookie: true })
  } catch (error) {
    if (error instanceof Error) {
      return await reply
        .status(INVALID_OR_EXPIRED_TOKEN.status)
        .send(INVALID_OR_EXPIRED_TOKEN.body)
    }
  }

  return await reply
    .clearCookie('refreshToken', {
      path: '/',
      secure: env.NODE_ENV === 'production',
      sameSite: env.NODE_ENV === 'production' ? 'strict' : 'lax',
      httpOnly: true,
    })
    .status(200)
    .send(LOGOUT)
}
