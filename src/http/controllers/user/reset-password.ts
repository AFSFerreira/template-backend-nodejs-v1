import type { FastifyReply, FastifyRequest } from 'fastify'
import { resetPasswordSchema } from '@/schemas/user/reset-password'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { makeResetPasswordUseCase } from '@/use-cases/factories/user/make-reset-password-use-case'

export async function resetPassword(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { newPassword, token } = resetPasswordSchema.parse(request.body)

  const resetPasswordUseCase = makeResetPasswordUseCase()

  try {
    await resetPasswordUseCase.execute({
      newPassword,
      token,
    })

    await reply.status(200).send({ message: 'Password changed successfully!' })
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return await reply.status(401).send({ message: error.message })
    }
  }
}
