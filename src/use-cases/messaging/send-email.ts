import { logger } from '@lib/logger'
import { SEND_EMAIL_MESSAGE } from '@messages/loggings'
import { sendEmail } from '@utils/send-email'
import type { Attachment } from 'nodemailer/lib/mailer'

interface SendEmailUseCaseRequest {
  to: string
  subject: string
  message: string
  html: string
  attachments?: Attachment[]
}

export class SendEmailUseCase {
  async execute({ to, subject, message, html, attachments }: SendEmailUseCaseRequest) {
    const email = await sendEmail({ to, subject, message, html, attachments })

    logger.info({ to, subject, message }, SEND_EMAIL_MESSAGE)

    return email
  }
}
