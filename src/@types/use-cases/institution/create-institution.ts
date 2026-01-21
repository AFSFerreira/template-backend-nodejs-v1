import type { Institution } from '@prisma/client'

export interface CreateInstitutionUseCaseRequest {
  name: string
}

export interface CreateInstitutionUseCaseResponse {
  institution: Institution
}
