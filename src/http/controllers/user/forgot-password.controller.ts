import type { FastifyReply, FastifyRequest } from 'fastify'
import { logger } from '@lib/logger'
import { PASSWORD_RESET_SUBJECT } from '@messages/emails/user-emails'
import { PASSWORD_RESET_EMAIL_FAILED } from '@messages/loggings/user-loggings'
import { PASSWORD_RESET_IF_USER_EXISTS } from '@messages/responses/user-responses'
import { forgotPasswordBodySchema } from '@schemas/user/forgot-password-body-schema'
import { forgotPasswordHtmlTemplate } from '@templates/forgot-password/forgot-password-html'
import { forgotPasswordTextTemplate } from '@templates/forgot-password/forgot-password-text'
import { SendEmailUseCase } from '@use-cases/messaging/send-email'
import { ForgotPasswordUseCase } from '@use-cases/user/forgot-password'
import { container } from 'tsyringe'

export async function forgotPassword(request: FastifyRequest, reply: FastifyReply) {
  const { login } = forgotPasswordBodySchema.parse(request.body)

  const useCase = container.resolve(ForgotPasswordUseCase)

  const { user, token } = await useCase.execute({ login })

  const sendEmailUseCase = container.resolve(SendEmailUseCase)

  const emailInfo = {
    email: user.email,
    username: user.username,
    fullName: user.fullName,
    token,
  }

  try {
    await sendEmailUseCase.execute({
      to: login,
      subject: PASSWORD_RESET_SUBJECT,
      message: forgotPasswordTextTemplate(emailInfo),
      html: forgotPasswordHtmlTemplate(emailInfo),
    })
  } catch (error) {
    logger.error({ error, targetId: user.publicId }, PASSWORD_RESET_EMAIL_FAILED)
  }

  return await reply.status(PASSWORD_RESET_IF_USER_EXISTS.status).send({ data: PASSWORD_RESET_IF_USER_EXISTS.body })
}
