import type SMTPPool from 'nodemailer/lib/smtp-pool'
import { SMTP_CONNECTION_TIMEOUT, SMTP_GREETING_TIMEOUT, SMTP_SOCKET_TIMEOUT } from '@constants/timing-constants'
import { env } from '@env/index'
import ms from 'ms'
import nodemailer from 'nodemailer'

const transporterOptions = {
  pool: true,
  maxConnections: 5,
  maxMessages: 100,
  rateDelta: ms('1s'),
  rateLimit: 5,

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
} as const satisfies SMTPPool.Options

export const transporter = nodemailer.createTransport(transporterOptions)
