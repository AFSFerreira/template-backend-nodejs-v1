import { PASSWORD_RESET_SUCCESSFUL } from '@messages/response'
import { resetPasswordBodySchema } from '@schemas/user/reset-password-body-schema'
import { makeResetPasswordUseCase } from '@use-cases/factories/user/make-reset-password-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function resetPassword(request: FastifyRequest, reply: FastifyReply) {
  const { newPassword, token } = resetPasswordBodySchema.parse(request.body)

  const resetPasswordUseCase = makeResetPasswordUseCase()

  await resetPasswordUseCase.execute({
    newPassword,
    token,
  })

  await reply.status(PASSWORD_RESET_SUCCESSFUL.status).send(PASSWORD_RESET_SUCCESSFUL.body)
}
