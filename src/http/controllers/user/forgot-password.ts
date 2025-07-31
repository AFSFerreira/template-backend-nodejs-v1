import type { FastifyReply, FastifyRequest } from 'fastify'
import { forgotPasswordSchema } from '@/http/schemas/user/forgot-password-schema'
import { forgotPasswordHtmlTemplate } from '@/templates/forgot-password-html'
import { forgotPasswordTextTemplate } from '@/templates/forgot-password-text'
import { UserNotFoundForPasswordResetError } from '@/use-cases/errors/user-not-found-for-password-reset-error'
import { makeSendEmailUseCase } from '@/use-cases/factories/messaging/make-send-email-use-case'
import { makeForgotPasswordUseCase } from '@/use-cases/factories/user/make-forgot-password-use-case'

export async function forgotPassword(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { login } = forgotPasswordSchema.parse(request.body)

  const forgotPasswordUseCase = makeForgotPasswordUseCase()

  try {
    const { user, token } = await forgotPasswordUseCase.execute({ login })

    const sendEmailUseCase = makeSendEmailUseCase()

    await sendEmailUseCase.execute({
      to: user.email,
      subject: 'Password recovery',
      message: forgotPasswordTextTemplate(user.fullName, token),
      html: forgotPasswordHtmlTemplate(user.fullName, token),
    })

    return await reply
      .status(200)
      .send({ message: 'Password reset successful' })
  } catch (error) {
    if (error instanceof UserNotFoundForPasswordResetError) {
      return await reply.status(200).send({ message: error.message })
    }

    throw error
  }
}
