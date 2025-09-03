import { UNAUTHORIZED } from '@messages/errors'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function verifyJwt(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify()
  } catch (error) {
    return await reply.status(UNAUTHORIZED.status).send(UNAUTHORIZED.body)
  }
}
