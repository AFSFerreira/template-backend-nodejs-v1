import type { Institution } from '@prisma/generated/client'

export interface InstitutionDefaultPresenterInput extends Institution {}

export interface HTTPInstitution {
  id: string
  name: string
}
