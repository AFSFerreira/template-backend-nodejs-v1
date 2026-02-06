import type { UpdateInstitutionalInfoQuery } from '@custom-types/repository/prisma/institutional-info/update-institutional-info-query'
import type { InstitutionalInfo } from '@prisma/generated/client'

export interface InstitutionalInfoRepository {
  getInstitutionalInfo: () => Promise<InstitutionalInfo>
  update: (query: UpdateInstitutionalInfoQuery) => Promise<InstitutionalInfo>
}
