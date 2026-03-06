import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { ResetPasswordBodyType } from '@custom-types/http/schemas/user/reset-password-body-schema'
import type { FastifyReply } from 'fastify'
import { PASSWORD_RESET_SUCCESSFUL } from '@messages/responses/user-responses/2xx'
import { ResetPasswordUseCase } from '@use-cases/user/reset-password'
import { container } from 'tsyringe'

export async function resetPassword(request: ZodRequest<{ body: ResetPasswordBodyType }>, reply: FastifyReply) {
  const { newPassword, token } = request.body

  const useCase = container.resolve(ResetPasswordUseCase)

  await useCase.execute({
    newPassword,
    token,
  })

  await reply.status(PASSWORD_RESET_SUCCESSFUL.status).send({ data: PASSWORD_RESET_SUCCESSFUL.body })
}
