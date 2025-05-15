import type { FastifyReply, FastifyRequest } from 'fastify'

export type GenericFastifyRequest = FastifyRequest

export interface IController {
  handle(request: GenericFastifyRequest, reply: FastifyReply): Promise<never>
}
