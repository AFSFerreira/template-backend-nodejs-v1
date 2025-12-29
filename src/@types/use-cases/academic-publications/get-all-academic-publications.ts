import type { CustomAcademicPublicationWithSimplifiedDetails } from '@custom-types/adapter/academic-publication-simplified'
import type { PaginatedResult } from '@custom-types/custom/pagination-meta-type'
import type { GetAllAcademicPublicationsQuerySchemaType } from '@custom-types/schemas/academic-pulication/get-all-academic-publications-query-schema'

export interface GetAllAcademicPublicationsUseCaseRequest extends GetAllAcademicPublicationsQuerySchemaType {}

export interface GetAllAcademicPublicationsUseCaseResponse
  extends PaginatedResult<CustomAcademicPublicationWithSimplifiedDetails[]> {}
