import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { ForgotPasswordBodyType } from '@custom-types/http/schemas/user/forgot-password-body-schema'
import type { FastifyReply } from 'fastify'
import { PASSWORD_RESET_IF_USER_EXISTS } from '@messages/responses/user-responses/2xx'
import { ForgotPasswordUseCase } from '@use-cases/user/forgot-password'
import { container } from 'tsyringe'

export async function forgotPassword(request: ZodRequest<{ body: ForgotPasswordBodyType }>, reply: FastifyReply) {
  const { login } = request.body

  const useCase = container.resolve(ForgotPasswordUseCase)

  await useCase.execute({ login })

  return await reply.sendApiResponse(PASSWORD_RESET_IF_USER_EXISTS)
}
