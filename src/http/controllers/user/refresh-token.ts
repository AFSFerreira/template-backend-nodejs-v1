import { messages } from '@constants/messages'
import { env } from '@env/index'
import type { FastifyRequest, FastifyReply } from 'fastify'

export async function refreshToken(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    await request.jwtVerify({ onlyCookie: true })
  } catch (error) {
    return await reply
      .status(401)
      .send({ message: messages.errors.invalidToken })
  }

  const accessToken = await reply.jwtSign(
    {},
    {
      sign: {
        sub: (request.user as { sub: string }).sub,
      },
    },
  )

  const refreshToken = await reply.jwtSign(
    {},
    {
      sign: {
        sub: (request.user as { sub: string }).sub,
        expiresIn: '7d',
      },
    },
  )

  return await reply
    .setCookie('refreshToken', refreshToken, {
      path: '/',
      secure: env.NODE_ENV === 'production',
      sameSite: env.NODE_ENV === 'production' ? 'strict' : 'lax',
      httpOnly: true,
    })
    .status(200)
    .send({ accessToken })
}
