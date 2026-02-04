import type { HtmlTemplateOutput } from '@custom-types/templates/html-template-output'
import type { IConfirmAccountHtmlTemplate } from '@custom-types/templates/user/confirm-account'
import type { Attachment } from 'nodemailer/lib/mailer'
import { EMAIL_LOGO_PATH } from '@constants/dynamic-file-constants'
import { APP_NAME } from '@constants/env-constants'
import { EMAIL_LOGO_CID, EMAIL_LOGO_NAME } from '@constants/static-file-constants'
import { env } from '@env/index'
import { toTitleCasePortuguese } from '@utils/formatters/to-title-case-portuguese'

export function confirmAccountHtmlTemplate({
  fullName,
  email,
  token,
}: IConfirmAccountHtmlTemplate): HtmlTemplateOutput {
  const url = `${env.FRONTEND_URL}/verificar-email/${token}`

  const attachments: Attachment[] = [
    {
      filename: EMAIL_LOGO_NAME,
      path: EMAIL_LOGO_PATH,
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
              Seja bem-vindo(a) ao <strong>${APP_NAME}</strong>! <br>
              Para concluir o seu cadastro, precisamos confirmar que este e-mail realmente pertence a você.
            </p>

            <div style="text-align: center; margin: 32px 0;">
              <a href="${url}"
                style="background: #1976d2; color: #fff; padding: 14px 28px; border-radius: 6px; text-decoration: none; font-weight: bold; font-size: 16px; display: inline-block;">
                Confirmar criação de conta
              </a>
            </div>

            <p style="color: #555; font-size: 16px; line-height: 1.6; margin: 0 0 24px;">
              Se preferir, copie e cole o link abaixo no seu navegador:<br>
              <a href="${url}" style="color: #1976d2; word-break: break-all;">${url}</a>
            </p>

            <p style="color: #222; font-size: 18px; font-weight: bold; margin: 32px 0 12px;">
              E-mail utilizado no cadastro:
            </p>

            <ul style="list-style: none; padding-left: 0; margin: 0 0 24px;">
              <li style="color: #555; font-size: 16px; line-height: 1.6;">
                <span style="font-weight: bold; color: #1976d2;">•</span> ${email}
              </li>
            </ul>

            <p style="color: #888; font-size: 14px; line-height: 1.5; margin: 32px 0 16px; border-top: 1px solid #eee;">
              Caso você não tenha criado uma conta no ${APP_NAME}, basta ignorar este e-mail. <br>
              Nenhuma ação será realizada sem a confirmação.
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
