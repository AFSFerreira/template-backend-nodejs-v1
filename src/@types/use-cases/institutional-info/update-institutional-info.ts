import type { UpdateInstitutionalInfoBodySchemaType } from '@custom-types/http/schemas/institutional-info/update-institutional-info-body-schema'
import type { InstitutionalInfo } from '@prisma/client'

export interface UpdateInstitutionalInfoUseCaseRequest {
  data: UpdateInstitutionalInfoBodySchemaType
}

export interface UpdateInstitutionalInfoUseCaseResponse {
  institutionalInfo: InstitutionalInfo
}
