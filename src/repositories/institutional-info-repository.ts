import type { UpdateInstitutionalInfoQuery } from '@custom-types/repository/institutional-info/update-institutional-info-query'
import type { InstitutionalInfo } from '@prisma/client'

export interface InstitutionalInfoRepository {
  getInstitutionalInfo: () => Promise<InstitutionalInfo>
  update: (query: UpdateInstitutionalInfoQuery) => Promise<InstitutionalInfo>
}
