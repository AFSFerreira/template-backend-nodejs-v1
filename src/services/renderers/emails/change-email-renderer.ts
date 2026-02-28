import type { Attachment } from 'nodemailer/lib/mailer'
import path from 'node:path'
import { NUNJUCKS_TEMPLATES_ROOT_PATH } from '@constants/dynamic-file-constants'
import { APP_NAME } from '@constants/env-constants'
import {
  CHANGE_EMAIL_HTML_TEMPLATE,
  CHANGE_EMAIL_TEXT_TEMPLATE,
  EMAIL_LOGO_CID,
} from '@constants/static-file-constants'
import { env } from '@env/index'
import { toTitleCasePortuguese } from '@utils/formatters/to-title-case-portuguese'
import { BaseRenderer } from '../base-renderer'
import { getEmailLogoAttachments } from './email-attachments'

interface ChangeEmailRendererInput {
  fullName: string
  oldEmail: string
  newEmail: string
  token: string
}

export class ChangeEmailRenderer extends BaseRenderer<ChangeEmailRendererInput> {
  protected readonly htmlTemplatePath = path.resolve(NUNJUCKS_TEMPLATES_ROOT_PATH, CHANGE_EMAIL_HTML_TEMPLATE)
  protected readonly textTemplatePath = path.resolve(NUNJUCKS_TEMPLATES_ROOT_PATH, CHANGE_EMAIL_TEXT_TEMPLATE)

  protected getAttachments(): Attachment[] {
    return getEmailLogoAttachments()
  }

  protected mapPayload(input: ChangeEmailRendererInput) {
    return {
      full_name: toTitleCasePortuguese(input.fullName),
      old_email: input.oldEmail,
      new_email: input.newEmail,
      url: `${env.FRONTEND_URL}/confirmar-alteracao-email/${input.token}`,
      app_name: APP_NAME,
      email_logo_cid: EMAIL_LOGO_CID,
    }
  }
}
