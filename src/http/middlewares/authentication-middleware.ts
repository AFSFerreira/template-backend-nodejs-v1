import type { FastifyReply, FastifyRequest } from 'fastify'
import { verify } from 'jsonwebtoken'
import { messages } from '@/constants/messages'
import { env } from '@/env'

interface IPayload {
  sub: string
}

export async function authenticationMiddleware(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const headerAuthorization = request.headers.authorization
    if (headerAuthorization === undefined) {
      throw new Error()
    }

    const [, token] = headerAuthorization.split(' ')

    const { sub: userId } = verify(token, env.JWT_SECRET) as IPayload

    request.userId = userId
  } catch (error) {
    return await reply
      .status(401)
      .send({ message: messages.errors.unauthorized })
  }
}
