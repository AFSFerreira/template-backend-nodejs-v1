import type { HtmlTemplateOutput } from '@custom-types/templates/html-template-output'
import type { IChangeEmailHtmlTemplate } from '@custom-types/templates/user/change-email'
import type { Attachment } from 'nodemailer/lib/mailer'
import { APP_NAME } from '@constants/env-constants'
import { EMAIL_LOGO_CID, EMAIL_LOGO_NAME } from '@constants/static-file-constants'
import { EMAIL_LOGO_LINK } from '@constants/url-constants'
import { env } from '@env/index'
import { toTitleCasePortuguese } from '@utils/formatters/to-title-case-portuguese'

export function changeEmailHtmlTemplate({
  fullName,
  oldEmail,
  newEmail,
  token,
}: IChangeEmailHtmlTemplate): HtmlTemplateOutput {
  const url = `${env.FRONTEND_URL}/confirmar-alteracao-email/${token}`

  const attachments: Attachment[] = [
    {
      filename: EMAIL_LOGO_NAME,
      path: EMAIL_LOGO_LINK,
      cid: EMAIL_LOGO_CID,
    },
  ]

  const html = `
<table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin: 0; padding: 0; background-color: transparent; border: 0;">
  <tr>
    <td style="padding: 20px 0;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%"
        style="max-width: 600px; font-family: Arial, sans-serif; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">

        <tr>
          <td align="center"
            style="padding: 30px 20px 20px; background-color: #000000; border-top-left-radius: 8px; border-top-right-radius: 8px;">
            <img src="cid:${EMAIL_LOGO_CID}"
              alt="Logo da Empresa"
              style="display: block; width: 150px; height: auto; background-color: black;">
          </td>
        </tr>

        <tr>
          <td style="padding: 0 40px 40px;">
            <br>
            <h2 style="color: #222; font-size: 24px; margin: 0 0 16px;">
              Olá, ${toTitleCasePortuguese(fullName)}!
            </h2>

            <p style="color: #555; font-size: 16px; line-height: 1.6; margin: 0 0 24px;">
              Recebemos uma solicitação de alteração do e-mail associado à sua conta no <strong>${APP_NAME}</strong>.
            </p>

            <p style="color: #555; font-size: 16px; line-height: 1.6; margin: 0 0 24px;">
              Para confirmar esta alteração e garantir que este novo e-mail realmente pertence a você,
              clique no botão abaixo:
            </p>

            <div style="text-align: center; margin: 32px 0;">
              <a href="${url}"
                style="background: #1976d2; color: #fff; padding: 14px 28px; border-radius: 6px; text-decoration: none; font-weight: bold; font-size: 16px; display: inline-block;">
                Confirmar alteração de e-mail
              </a>
            </div>

            <p style="color: #555; font-size: 16px; line-height: 1.6; margin: 0 0 24px;">
              Se preferir, copie e cole o link abaixo no seu navegador:<br>
              <a href="${url}" style="color: #1976d2; word-break: break-all;">${url}</a>
            </p>

            <p style="color: #222; font-size: 18px; font-weight: bold; margin: 32px 0 12px;">
              Detalhes da alteração:
            </p>

            <ul style="list-style: none; padding-left: 0; margin: 0 0 24px;">
              <li style="color: #555; font-size: 16px; line-height: 1.6; margin-bottom: 8px;">
                <span style="font-weight: bold; color: #888;">E-mail antigo:</span> ${oldEmail}
              </li>
              <li style="color: #555; font-size: 16px; line-height: 1.6;">
                <span style="font-weight: bold; color: #1976d2;">Novo e-mail:</span> ${newEmail}
              </li>
            </ul>

            <p style="color: #888; font-size: 14px; line-height: 1.5; margin: 32px 0 16px; border-top: 1px solid #eee; padding-top: 16px;">
              <strong>⚠️ Importante:</strong> Se você não solicitou esta alteração de e-mail,
              por favor, ignore este e-mail e entre em contato imediatamente com nossa equipe de suporte.
              Sua conta permanecerá com o e-mail atual até que a alteração seja confirmada.
            </p>

            <p style="color: #555; font-size: 16px; line-height: 1.6; margin: 0;">
              Atenciosamente,<br>
              <span style="font-weight: bold;">Equipe ${APP_NAME}</span>
            </p>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
`.trim()

  return { html, attachments }
}
