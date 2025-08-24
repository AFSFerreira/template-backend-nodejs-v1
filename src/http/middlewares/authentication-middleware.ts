import { messages } from '@constants/messages'
import { env } from '@env/index'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { verify } from 'jsonwebtoken'

interface Payload {
  sub: string
}

export async function authenticationMiddleware(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const headerAuthorization = request.headers.authorization
    if (headerAuthorization === undefined) {
      return await reply
        .status(401)
        .send({ message: messages.errors.unauthorized })
    }

    const [, token] = headerAuthorization.split(' ')

    const { sub: userPublicId } = verify(token, env.JWT_SECRET) as Payload

    request.userPublicId = userPublicId
  } catch (error) {
    return await reply
      .status(401)
      .send({ message: messages.errors.unauthorized })
  }
}
