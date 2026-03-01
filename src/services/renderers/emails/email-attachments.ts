import type { Attachment } from 'nodemailer/lib/mailer'
import { LOGO_PATH } from '@constants/dynamic-file-constants'
import { EMAIL_LOGO_CID, EMAIL_LOGO_NAME } from '@constants/static-file-constants'

export function getEmailLogoAttachments(): Attachment[] {
  return [
    {
      filename: EMAIL_LOGO_NAME,
      path: LOGO_PATH,
      cid: EMAIL_LOGO_CID,
    },
  ]
}
