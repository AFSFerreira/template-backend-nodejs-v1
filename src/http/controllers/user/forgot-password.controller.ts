import { logger } from '@lib/logger'
import { PASSWORD_RESET_SUBJECT } from '@messages/emails'
import { PASSWORD_RESET_EMAIL_FAILED } from '@messages/loggings'
import { PASSWORD_RESET_IF_USER_EXISTS } from '@messages/responses/user-responses'
import { forgotPasswordBodySchema } from '@schemas/user/forgot-password-body-schema'
import { forgotPasswordHtmlTemplate } from '@templates/forgot-password/forgot-password-html'
import { forgotPasswordTextTemplate } from '@templates/forgot-password/forgot-password-text'
import { makeSendEmailUseCase } from '@use-cases/factories/messaging/make-send-email-use-case'
import { makeForgotPasswordUseCase } from '@use-cases/factories/user/make-forgot-password-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function forgotPassword(request: FastifyRequest, reply: FastifyReply) {
  const { login } = forgotPasswordBodySchema.parse(request.body)

  const useCase = makeForgotPasswordUseCase()

  const { user, token } = await useCase.execute({ login })

  const sendEmailUseCase = makeSendEmailUseCase()

  const emailInfo = {
    email: user.email,
    username: user.username,
    fullName: user.fullName,
    token,
  }

  try {
    await sendEmailUseCase.execute({
      to: [user.email, user.secondaryEmail].find((email) => email === login),
      subject: PASSWORD_RESET_SUBJECT,
      message: forgotPasswordTextTemplate(emailInfo),
      html: forgotPasswordHtmlTemplate(emailInfo),
    })
  } catch (error) {
    logger.error({ ...error, targetId: user.publicId }, PASSWORD_RESET_EMAIL_FAILED)
  }

  return await reply.status(PASSWORD_RESET_IF_USER_EXISTS.status).send({ data: PASSWORD_RESET_IF_USER_EXISTS.body })
}
