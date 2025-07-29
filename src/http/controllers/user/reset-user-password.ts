import type { FastifyReply, FastifyRequest } from 'fastify'
import { resetUserPasswordSchema } from '@/http/schemas/user/reset-user-password'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { makeResetUserPasswordUseCase } from '@/use-cases/factories/user/make-reset-user-password-use-case'

export async function resetUserPassword(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { newPassword, token } = resetUserPasswordSchema.parse(request.body)

  const resetUserPasswordUseCase = makeResetUserPasswordUseCase()

  try {
    await resetUserPasswordUseCase.execute({
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
