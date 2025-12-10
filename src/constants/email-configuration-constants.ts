import type SMTPTransport from 'nodemailer/lib/smtp-transport'
import { env } from '@env/index'
import { SMTP_CONNECTION_TIMEOUT, SMTP_GREETING_TIMEOUT, SMTP_SOCKET_TIMEOUT } from './timing-constants'

export const transporterOptions: SMTPTransport.Options = {
  host: env.SMTP_HOST,
  port: env.SMTP_PORT,
  secure: env.SMTP_SECURE,
  auth: {
    user: env.SMTP_EMAIL,
    pass: env.SMTP_PASSWORD,
  },
  connectionTimeout: SMTP_CONNECTION_TIMEOUT,
  greetingTimeout: SMTP_GREETING_TIMEOUT,
  socketTimeout: SMTP_SOCKET_TIMEOUT,
} as const
