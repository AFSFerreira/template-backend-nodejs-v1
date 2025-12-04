import type { CustomAcademicPublicationWithSimplifiedDetails } from '@custom-types/adapter/output/custom-academic-publication-with-simplified-details-type'
import type { PaginatedResult } from '@custom-types/custom/pagination-meta-type'
import type { GetAllAcademicPublicationsQuerySchemaType } from '@custom-types/schemas/academic-pulication/get-all-academic-publications-query-schema'

export interface GetAllAcademicPublicationsUseCaseRequest extends GetAllAcademicPublicationsQuerySchemaType {}

export interface GetAllAcademicPublicationsUseCaseResponse
  extends PaginatedResult<CustomAcademicPublicationWithSimplifiedDetails[]> {}
