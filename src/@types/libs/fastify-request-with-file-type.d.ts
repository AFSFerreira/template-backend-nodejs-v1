import type { FastifyRequest } from 'fastify'
import type { FileRequest } from '../custom/file-request-type'

export type FastifyRequestWithFile = FastifyRequest & FileRequest
