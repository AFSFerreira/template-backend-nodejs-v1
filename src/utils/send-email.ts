import { env } from '@env/index'
import ms from 'ms'
import nodemailer from 'nodemailer'
import type { SentMessageInfo } from 'nodemailer'
import type { Attachment } from 'nodemailer/lib/mailer'

const transporter = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: env.SMTP_PORT,
  secure: env.SMTP_SECURE,
  auth: {
    user: env.SMTP_EMAIL,
    pass: env.SMTP_PASSWORD,
  },
  connectionTimeout: ms('10s'),
  greetingTimeout: ms('5s'),
  socketTimeout: ms('20s'),
})

interface SendEmailRequest {
  to: string
  subject: string
  message: string
  html: string
  attachments?: Attachment[]
}

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
    ...(attachments !== undefined ? { attachments } : {}),
  })

  return info
}
