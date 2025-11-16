import type { CustomAcademicPublicationWithSimplifiedDetails } from '@custom-types/adapter/output/custom-academic-publication-with-simplified-details-type'
import type { PaginatedResult } from '@custom-types/custom/pagination-meta-type'
import type { ListAllAcademicPublicationsQuery } from '@custom-types/repositories/academic-publication/list-all-academic-publications-query'
import type { AcademicPublication, Prisma } from '@prisma/client'

export interface AcademicPublicationsRepository {
  create: (data: Prisma.AcademicPublicationUncheckedCreateInput) => Promise<AcademicPublication>
  createMany: (data: Prisma.AcademicPublicationUncheckedCreateInput[]) => Promise<void>
  findById: (id: number) => Promise<AcademicPublication | null>
  findManyByUserId: (userId: number) => Promise<AcademicPublication[]>
  listAllAcademicPublications: (
    query?: ListAllAcademicPublicationsQuery,
  ) => Promise<PaginatedResult<CustomAcademicPublicationWithSimplifiedDetails[]>>
  delete: (id: number) => Promise<void>
  update: (id: number, data: Prisma.AcademicPublicationUpdateInput) => Promise<AcademicPublication>
}
