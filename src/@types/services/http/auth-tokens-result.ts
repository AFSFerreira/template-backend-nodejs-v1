import type { FastifyReply } from 'fastify'

export interface AuthTokensResult {
  accessToken: string
  reply: FastifyReply
}
