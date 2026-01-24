import type { FastifyReply, FastifyRequest } from 'fastify'
import { EMAIL_CHANGE_REQUESTED } from '@messages/responses/user-responses.ts/2xx'
import { requestEmailChangeBodySchema } from '@schemas/user/request-email-change-body-schema'
import { getRequestUserPublicId } from '@services/http/get-request-user-public-id'
import { RequestEmailChangeUseCase } from '@use-cases/user/request-email-change'
import { container } from 'tsyringe'

export async function requestEmailChange(request: FastifyRequest, reply: FastifyReply) {
  const parsedBody = requestEmailChangeBodySchema.parse(request.body)
  const userPublicId = getRequestUserPublicId(request)

  const useCase = container.resolve(RequestEmailChangeUseCase)

  await useCase.execute({
    ...parsedBody,
    userPublicId,
  })

  await reply.status(EMAIL_CHANGE_REQUESTED.status).send({ data: EMAIL_CHANGE_REQUESTED.body })
}
