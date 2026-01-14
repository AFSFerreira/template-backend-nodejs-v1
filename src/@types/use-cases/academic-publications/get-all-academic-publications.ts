import type { PaginatedResult } from '@custom-types/custom/pagination-meta-type'
import type { GetAllAcademicPublicationsQuerySchemaType } from '@custom-types/http/schemas/academic-pulication/get-all-academic-publications-query-schema'
import type { CustomAcademicPublicationWithSimplifiedDetails } from '@custom-types/repository/prisma/adapter/academic-publication-simplified'

export interface GetAllAcademicPublicationsUseCaseRequest extends GetAllAcademicPublicationsQuerySchemaType {}

export interface GetAllAcademicPublicationsUseCaseResponse
  extends PaginatedResult<CustomAcademicPublicationWithSimplifiedDetails[]> {}
