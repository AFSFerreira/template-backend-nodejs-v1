import { PASSWORD_RESET_SUCCESSFUL } from '@messages/responses/user-responses'
import { resetPasswordBodySchema } from '@schemas/user/reset-password-body-schema'
import { makeResetPasswordUseCase } from '@use-cases/factories/user/make-reset-password-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function resetPassword(request: FastifyRequest, reply: FastifyReply) {
  const { newPassword, token } = resetPasswordBodySchema.parse(request.body)

  const useCase = makeResetPasswordUseCase()

  await useCase.execute({
    newPassword,
    token,
  })

  await reply.status(PASSWORD_RESET_SUCCESSFUL.status).send({ data: PASSWORD_RESET_SUCCESSFUL.body })
}
