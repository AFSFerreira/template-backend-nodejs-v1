import type { CustomAcademicPublicationWithSimplifiedDetails } from '@custom-types/custom-academic-publication-with-simplified-details-type'
import type { PaginatedResult } from '@custom-types/pagination-meta-type'
import type { AcademicPublication, Prisma } from '@prisma/client'
import type { GetAllAcademicPublicationsQuerySchemaType } from '@schemas/academic-publication/get-all-academic-publications-query-schema'

export type ListAllAcademicPublicationsQuery = GetAllAcademicPublicationsQuerySchemaType

export interface AcademicPublicationsRepository {
  create: (data: Prisma.AcademicPublicationUncheckedCreateInput) => Promise<AcademicPublication>
  createMany: (data: Prisma.AcademicPublicationUncheckedCreateInput[]) => Promise<void>
  findById: (id: number) => Promise<AcademicPublication | null>
  findManyByUserId: (userId: number) => Promise<AcademicPublication[]>
  listAllAcademicPublications: (query?: ListAllAcademicPublicationsQuery) => Promise<PaginatedResult<CustomAcademicPublicationWithSimplifiedDetails[]>>
  delete: (id: number) => Promise<void>
  update: (id: number, data: Prisma.AcademicPublicationUpdateInput) => Promise<AcademicPublication>
}
