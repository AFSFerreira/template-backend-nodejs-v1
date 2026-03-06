import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { VerifyEmailBodyType } from '@custom-types/http/schemas/user/verify-email-body-schema'
import type { FastifyReply } from 'fastify'
import { EMAIL_VERIFICATION_SUCCESSFUL } from '@messages/responses/user-responses/2xx'
import { VerifyEmailUseCase } from '@use-cases/user/verify-email'
import { container } from 'tsyringe'

export async function verifyEmail(request: ZodRequest<{ body: VerifyEmailBodyType }>, reply: FastifyReply) {
  const parsedBody = request.body

  const useCase = container.resolve(VerifyEmailUseCase)

  await useCase.execute(parsedBody)

  return await reply.status(EMAIL_VERIFICATION_SUCCESSFUL.status).send(EMAIL_VERIFICATION_SUCCESSFUL.body)
}
