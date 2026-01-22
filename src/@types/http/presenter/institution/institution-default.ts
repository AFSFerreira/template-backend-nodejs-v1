import type { Institution } from '@prisma/client'

export interface InstitutionDefaultPresenterInput extends Institution {}

export interface HTTPInstitution {
  id: string
  name: string
}
