import type { Attachment } from 'nodemailer/lib/mailer'

export interface RendererOutput {
  html: string
  text: string
  attachments: Attachment[]
}
