import { PASSWORD_RESET_IF_USER_EXISTS } from '@messages/errors'
import { forgotPasswordBodySchema } from '@schemas/user/forgot-password-body-schema'
import { forgotPasswordHtmlTemplate } from '@templates/forgot-password/forgot-password-html'
import { forgotPasswordTextTemplate } from '@templates/forgot-password/forgot-password-text'
import { makeSendEmailUseCase } from '@use-cases/factories/messaging/make-send-email-use-case'
import { makeForgotPasswordUseCase } from '@use-cases/factories/user/make-forgot-password-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function forgotPassword(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { login } = forgotPasswordBodySchema.parse(request.body)

  const forgotPasswordUseCase = makeForgotPasswordUseCase()

  const { user, token } = await forgotPasswordUseCase.execute({ login })

  const sendEmailUseCase = makeSendEmailUseCase()

  try {
    await sendEmailUseCase.execute({
      to: user.email,
      subject: 'Recuperação de Senha',
      message: forgotPasswordTextTemplate(user.fullName, token),
      html: forgotPasswordHtmlTemplate(user.fullName, token),
    })
  } catch (error) {
    // TODO: Inserir informações do erro no logger posteriormente
    console.error(error)
  }

  return await reply
    .status(PASSWORD_RESET_IF_USER_EXISTS.status)
    .send(PASSWORD_RESET_IF_USER_EXISTS.body)
}
