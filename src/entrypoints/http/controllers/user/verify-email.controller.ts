import type { FastifyReply, FastifyRequest } from 'fastify'
import { verifyEmailBodySchema } from '@http/schemas/user/verify-email-body-schema'
import { EMAIL_VERIFICATION_SUCCESSFUL } from '@messages/responses/user-responses/2xx'
import { VerifyEmailUseCase } from '@use-cases/user/verify-email'
import { container } from 'tsyringe'

export async function verifyEmail(request: FastifyRequest, reply: FastifyReply) {
  const parsedBody = verifyEmailBodySchema.parse(request.body)

  const useCase = container.resolve(VerifyEmailUseCase)

  await useCase.execute(parsedBody)

  return await reply.status(EMAIL_VERIFICATION_SUCCESSFUL.status).send(EMAIL_VERIFICATION_SUCCESSFUL.body)
}
