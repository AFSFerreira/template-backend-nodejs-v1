import type { UpdateInstitutionBodySchemaType } from '@custom-types/http/schemas/institution/update-institution-body-schema'
import type { Institution } from '@prisma/generated/client'

export interface UpdateInstitutionUseCaseRequest {
  publicId: string
  data: UpdateInstitutionBodySchemaType
}

export interface UpdateInstitutionUseCaseResponse {
  institution: Institution
}
