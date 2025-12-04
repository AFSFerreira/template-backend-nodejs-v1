import { ApiError } from '@errors/api-error'
import { MISSING_MULTIPART_CONTENT_TYPE } from '@messages/responses/common-responses'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function verifyMultipart(request: FastifyRequest, _reply: FastifyReply) {
  if (!request.isMultipart()) {
    throw new ApiError(MISSING_MULTIPART_CONTENT_TYPE)
  }
}
