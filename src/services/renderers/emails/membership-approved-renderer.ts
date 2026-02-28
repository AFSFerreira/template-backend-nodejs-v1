import type { Attachment } from 'nodemailer/lib/mailer'
import path from 'node:path'
import { NUNJUCKS_TEMPLATES_ROOT_PATH } from '@constants/dynamic-file-constants'
import { APP_NAME } from '@constants/env-constants'
import {
  EMAIL_LOGO_CID,
  MEMBERSHIP_ACCEPTED_HTML_TEMPLATE,
  MEMBERSHIP_ACCEPTED_TEXT_TEMPLATE,
} from '@constants/static-file-constants'
import { toTitleCasePortuguese } from '@utils/formatters/to-title-case-portuguese'
import { BaseRenderer } from '../base-renderer'
import { getEmailLogoAttachments } from './email-attachments'

interface MembershipApprovedRendererInput {
  fullName: string
  email: string
}

export class MembershipApprovedRenderer extends BaseRenderer<MembershipApprovedRendererInput> {
  protected readonly htmlTemplatePath = path.resolve(NUNJUCKS_TEMPLATES_ROOT_PATH, MEMBERSHIP_ACCEPTED_HTML_TEMPLATE)
  protected readonly textTemplatePath = path.resolve(NUNJUCKS_TEMPLATES_ROOT_PATH, MEMBERSHIP_ACCEPTED_TEXT_TEMPLATE)

  protected getAttachments(): Attachment[] {
    return getEmailLogoAttachments()
  }

  protected mapPayload(input: MembershipApprovedRendererInput) {
    return {
      full_name: toTitleCasePortuguese(input.fullName),
      email: input.email,
      app_name: APP_NAME,
      email_logo_cid: EMAIL_LOGO_CID,
    }
  }
}
