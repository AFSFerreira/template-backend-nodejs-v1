import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { RequestEmailChangeBodyType } from '@custom-types/http/schemas/user/request-email-change-body-schema'
import type { FastifyReply } from 'fastify'
import { EMAIL_CHANGE_REQUESTED } from '@messages/responses/user-responses/2xx'
import { getRequestUserPublicId } from '@services/http/get-request-user-public-id'
import { RequestEmailChangeUseCase } from '@use-cases/user/request-email-change'
import { container } from 'tsyringe'

export async function requestEmailChange(
  request: ZodRequest<{ body: RequestEmailChangeBodyType }>,
  reply: FastifyReply,
) {
  const parsedBody = request.body
  const userPublicId = getRequestUserPublicId(request)

  const useCase = container.resolve(RequestEmailChangeUseCase)

  await useCase.execute({
    ...parsedBody,
    userPublicId,
  })

  return await reply.sendApiResponse(EMAIL_CHANGE_REQUESTED)
}
