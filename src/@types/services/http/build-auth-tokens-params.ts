import type { FastifyReply } from 'fastify'
import type { TokenPayload } from './token-payload'

export interface BuildAuthTokensParams {
  reply: FastifyReply
  id: string
  payload: TokenPayload
}
