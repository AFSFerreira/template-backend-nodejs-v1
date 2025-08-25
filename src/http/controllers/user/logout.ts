import { messages } from '@constants/messages'
import { env } from '@env/index'
import { type FastifyRequest, type FastifyReply } from 'fastify'

export async function logout(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify({ onlyCookie: true })
  } catch (error) {
    if (error instanceof Error) {
      return await reply.status(400).send({ message: error.message })
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
    .send({ message: messages.info.logout })
}
