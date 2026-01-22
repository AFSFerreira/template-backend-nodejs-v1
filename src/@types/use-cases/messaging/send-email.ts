import type { Attachment } from 'nodemailer/lib/mailer'

export interface SendEmailUseCaseRequest {
  to: string
  subject: string
  message: string
  html: string
  attachments?: Attachment[]
}
