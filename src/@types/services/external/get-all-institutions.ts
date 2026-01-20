import type { GetAllInstitutionsQuerySchemaType } from '@custom-types/http/schemas/institution/get-all-institutions-query-schema'
import type { InstitutionsRepository } from '@repositories/institutions-repository'

export interface IGetAllInstitutions {
  institutionsRepository: InstitutionsRepository
  query: Partial<GetAllInstitutionsQuerySchemaType>
}
