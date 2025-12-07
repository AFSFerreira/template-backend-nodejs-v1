import type { InstitutionsRepository } from '@repositories/institutions-repository'

export interface IValidateInstitutionName {
  institutionsRepository: InstitutionsRepository
  institution: string
}
