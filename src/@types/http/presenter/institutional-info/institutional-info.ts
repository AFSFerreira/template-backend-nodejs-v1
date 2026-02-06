import type { InstitutionalInfo } from '@prisma/generated/client'

export interface InstitutionalInfoPresenterInput extends InstitutionalInfo {}

export interface HTTPInstitutionalInfo {
  aboutImage: string
  statuteFile: string
  electionNoticeFile: string
}
