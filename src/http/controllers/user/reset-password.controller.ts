import { PASSWORD_RESET_SUCCESSFUL } from '@messages/responses/user-responses'
import { resetPasswordBodySchema } from '@schemas/user/reset-password-body-schema'
import { ResetPasswordUseCase } from '@use-cases/user/reset-password'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'

export async function resetPassword(request: FastifyRequest, reply: FastifyReply) {
  const { newPassword, token } = resetPasswordBodySchema.parse(request.body)

  const useCase = container.resolve(ResetPasswordUseCase)

  await useCase.execute({
    newPassword,
    token,
  })

  await reply.status(PASSWORD_RESET_SUCCESSFUL.status).send({ data: PASSWORD_RESET_SUCCESSFUL.body })
}
