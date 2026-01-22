import type { Attachment } from 'nodemailer/lib/mailer'

export interface HtmlTemplateOutput {
  html: string
  attachments?: Attachment[]
}
