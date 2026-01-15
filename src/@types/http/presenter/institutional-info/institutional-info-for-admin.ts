import type { InstitutionalInfo } from '@prisma/client'
import type { JSONContent } from '@tiptap/core'

export interface InstitutionalInfoForAdminPresenterInput extends InstitutionalInfo {}

export interface HTTPInstitutionalInfoForAdmin {
  aboutImage: string
  aboutDescription: JSONContent
  statuteFile: string
  electionNoticeFile: string
}
