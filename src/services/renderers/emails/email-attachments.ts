import type { Attachment } from 'nodemailer/lib/mailer'
import { EMAIL_LOGO_PATH } from '@constants/dynamic-file-constants'
import { EMAIL_LOGO_CID, EMAIL_LOGO_NAME } from '@constants/static-file-constants'

export function getEmailLogoAttachments(): Attachment[] {
  return [
    {
      filename: EMAIL_LOGO_NAME,
      path: EMAIL_LOGO_PATH,
      cid: EMAIL_LOGO_CID,
    },
  ]
}
