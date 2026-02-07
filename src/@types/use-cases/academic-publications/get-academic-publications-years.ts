import type { PaginatedResult } from '@custom-types/custom/pagination-meta-type'
import type { GetAcademicPublicationsYearsQuerySchemaType } from '@custom-types/http/schemas/academic-pulication/get-academic-publications-years-query-schema'

export interface AcademicPublicationYear {
  year: number
  count: number
}

export type GetAcademicPublicationsYearsUseCaseRequest = GetAcademicPublicationsYearsQuerySchemaType

export type GetAcademicPublicationsYearsUseCaseResponse = PaginatedResult<AcademicPublicationYear[]>
