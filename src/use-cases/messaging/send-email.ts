import type { SendEmailUseCaseRequest } from '@custom-types/use-cases/messaging/send-email'
import { logger } from '@lib/logger'
import { SEND_EMAIL_MESSAGE } from '@messages/loggings'
import { sendEmail } from '@services/send-email'

export class SendEmailUseCase {
  async execute({ to, subject, message, html, attachments }: SendEmailUseCaseRequest) {
    const email = await sendEmail({ to, subject, message, html, attachments })

    logger.info({ to, subject, message }, SEND_EMAIL_MESSAGE)

    return email
  }
}
