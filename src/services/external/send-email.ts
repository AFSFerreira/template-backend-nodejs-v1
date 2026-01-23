import type { SendEmailRequest } from '@custom-types/lib/node-mailer/send-email-request-type'
import type { SentMessageInfo } from 'nodemailer'
import { env } from '@env/index'
import { transporter } from '@lib/nodemailer'

export async function sendEmail({
  to,
  subject,
  message,
  html,
  attachments,
}: SendEmailRequest): Promise<SentMessageInfo> {
  const info = await transporter.sendMail({
    from: env.SMTP_EMAIL,
    to,
    subject,
    text: message,
    html,
    attachments,
  })

  return info
}
