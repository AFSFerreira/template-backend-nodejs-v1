import type { SendEmailRequest } from '@custom-types/lib/node-mailer/send-email-request-type'
import type { SentMessageInfo } from 'nodemailer'
import { env } from '@env/index'
import { transporter } from '@lib/nodemailer'

/**
 * Envia um e-mail utilizando o transporter Nodemailer configurado na aplicação.
 *
 * @param to - Endereço(s) de destino.
 * @param subject - Assunto do e-mail.
 * @param message - Corpo em texto plano.
 * @param html - Corpo em HTML.
 * @param attachments - Anexos opcionais.
 * @returns Informações do envio retornadas pelo Nodemailer.
 */
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
