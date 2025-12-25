import type { FastifyReply, FastifyRequest } from 'fastify'
import { PASSWORD_RESET_IF_USER_EXISTS } from '@messages/responses/user-responses'
import { forgotPasswordBodySchema } from '@schemas/user/forgot-password-body-schema'
import { ForgotPasswordUseCase } from '@use-cases/user/forgot-password'
import { container } from 'tsyringe'

export async function forgotPassword(request: FastifyRequest, reply: FastifyReply) {
  const { login } = forgotPasswordBodySchema.parse(request.body)

  const useCase = container.resolve(ForgotPasswordUseCase)

  await useCase.execute({ login })

  return await reply.status(PASSWORD_RESET_IF_USER_EXISTS.status).send({ data: PASSWORD_RESET_IF_USER_EXISTS.body })
}
