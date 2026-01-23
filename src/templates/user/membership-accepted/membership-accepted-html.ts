import type { HtmlTemplateOutput } from '@custom-types/templates/html-template-output'
import type { IMembershipApprovedHtmlTemplate } from '@custom-types/templates/user/membership-approved'
import type { Attachment } from 'nodemailer/lib/mailer'
import { APP_NAME } from '@constants/env-constants'
import { EMAIL_LOGO_CID, EMAIL_LOGO_NAME } from '@constants/static-file-constants'
import { EMAIL_LOGO_LINK } from '@constants/url-constants'
import { toTitleCasePortuguese } from '@utils/formatters/to-title-case-portuguese'

export function membershipApprovedHtmlTemplate({
  fullName,
  email,
}: IMembershipApprovedHtmlTemplate): HtmlTemplateOutput {
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
                Olá, ${toTitleCasePortuguese(fullName)}
              </h2>

              <p style="color: #555; font-size: 16px; line-height: 1.6; margin: 0 0 24px;">
                Temos o prazer de informar que o seu pedido de associação ao
                <strong>${APP_NAME}</strong> foi aprovado com sucesso.
              </p>

              <p style="color: #555; font-size: 16px; line-height: 1.6; margin: 0 0 24px;">
                A partir de agora, você já pode usufruir dos recursos e funcionalidades
                disponíveis para membros da nossa plataforma.
              </p>

              <p style="color: #555; font-size: 16px; line-height: 1.6; margin: 0 0 24px;">
                Em caso de dúvidas ou necessidade de suporte, nossa equipe está à disposição
                para auxiliá-lo(a) através dos canais oficiais.
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
                Este e-mail tem caráter informativo e não requer nenhuma ação adicional.
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
