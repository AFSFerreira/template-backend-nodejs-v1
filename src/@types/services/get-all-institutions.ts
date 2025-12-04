import type { GetAllInstitutionsSchemaType } from '@custom-types/schemas/institution/get-all-institutions-query-schema'
import type { InstitutionsRepository } from '@repositories/institutions-repository'

export interface IGetAllInstitutions {
  institutionsRepository: InstitutionsRepository
  query: Partial<GetAllInstitutionsSchemaType>
}
