import type { Attachment } from 'nodemailer/lib/mailer'
import path from 'node:path'
import { NUNJUCKS_TEMPLATES_ROOT_PATH } from '@constants/dynamic-file-constants'
import { APP_NAME } from '@constants/env-constants'
import {
  EMAIL_LOGO_CID,
  FORGOT_PASSWORD_HTML_TEMPLATE,
  FORGOT_PASSWORD_TEXT_TEMPLATE,
} from '@constants/static-file-constants'
import { env } from '@env/index'
import { toTitleCasePortuguese } from '@utils/formatters/to-title-case-portuguese'
import { BaseRenderer } from '../base-renderer'
import { getEmailLogoAttachments } from './email-attachments'

interface ForgotPasswordRendererInput {
  fullName: string
  token: string
  email: string
  username: string
}

export class ForgotPasswordRenderer extends BaseRenderer<ForgotPasswordRendererInput> {
  protected readonly htmlTemplatePath = path.resolve(NUNJUCKS_TEMPLATES_ROOT_PATH, FORGOT_PASSWORD_HTML_TEMPLATE)
  protected readonly textTemplatePath = path.resolve(NUNJUCKS_TEMPLATES_ROOT_PATH, FORGOT_PASSWORD_TEXT_TEMPLATE)

  protected getAttachments(): Attachment[] {
    return getEmailLogoAttachments()
  }

  protected mapPayload(input: ForgotPasswordRendererInput) {
    return {
      full_name: toTitleCasePortuguese(input.fullName),
      email: input.email,
      username: input.username,
      url: `${env.FRONTEND_URL}/reset-password?token=${input.token}`,
      app_name: APP_NAME,
      email_logo_cid: EMAIL_LOGO_CID,
    }
  }
}
