import type { FastifyReply, FastifyRequest } from 'fastify'
import { EMAIL_UPDATED_SUCCESSFULLY } from '@messages/responses/user-responses.ts/2xx'
import { confirmEmailChangeBodySchema } from '@schemas/user/confirm-email-change-body-schema'
import { ConfirmEmailChangeUseCase } from '@use-cases/user/confirm-email-change'
import { container } from 'tsyringe'

export async function confirmEmailChange(request: FastifyRequest, reply: FastifyReply) {
  const parsedBody = confirmEmailChangeBodySchema.parse(request.body)

  const useCase = container.resolve(ConfirmEmailChangeUseCase)

  await useCase.execute(parsedBody)

  await reply.status(EMAIL_UPDATED_SUCCESSFULLY.status).send({ data: EMAIL_UPDATED_SUCCESSFULLY.body })
}
