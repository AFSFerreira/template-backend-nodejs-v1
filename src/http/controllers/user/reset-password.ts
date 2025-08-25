import { messages } from '@constants/messages'
import { resetPasswordBodySchema } from '@schemas/user/reset-password-body-schema'
import { InvalidCredentialsError } from '@use-cases/errors/invalid-credentials-error'
import { makeResetPasswordUseCase } from '@use-cases/factories/user/make-reset-password-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function resetPassword(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { newPassword, token } = resetPasswordBodySchema.parse(request.body)

  const resetPasswordUseCase = makeResetPasswordUseCase()

  try {
    await resetPasswordUseCase.execute({
      newPassword,
      token,
    })

    await reply.status(200).send({ message: messages.info.changedPassword })
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return await reply.status(401).send({ message: error.message })
    }
  }
}
