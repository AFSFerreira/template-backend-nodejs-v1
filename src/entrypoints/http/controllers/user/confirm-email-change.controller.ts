import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { ConfirmEmailChangeBodyType } from '@custom-types/http/schemas/user/confirm-email-change-body-schema'
import type { FastifyReply } from 'fastify'
import { EMAIL_UPDATED_SUCCESSFULLY } from '@messages/responses/user-responses/2xx'
import { ConfirmEmailChangeUseCase } from '@use-cases/user/confirm-email-change'
import { container } from 'tsyringe'

export async function confirmEmailChange(
  request: ZodRequest<{ body: ConfirmEmailChangeBodyType }>,
  reply: FastifyReply,
) {
  const parsedBody = request.body

  const useCase = container.resolve(ConfirmEmailChangeUseCase)

  await useCase.execute(parsedBody)

  await reply.status(EMAIL_UPDATED_SUCCESSFULLY.status).send({ data: EMAIL_UPDATED_SUCCESSFULLY.body })
}
