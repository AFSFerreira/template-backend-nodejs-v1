import type { Institution } from '@prisma/generated/client'

export interface CreateInstitutionUseCaseRequest {
  name: string
}

export interface CreateInstitutionUseCaseResponse {
  institution: Institution
}
