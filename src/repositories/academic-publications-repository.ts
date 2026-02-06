import type { PaginatedResult } from '@custom-types/custom/pagination-meta-type'
import type { ListAllAcademicPublicationsQuery } from '@custom-types/repository/prisma/academic-publication/list-all-academic-publications-query'
import type { UpdateAcademicPublicationQuery } from '@custom-types/repository/prisma/academic-publication/update-academic-publication-query'
import type { CustomAcademicPublicationWithSimplifiedDetails } from '@custom-types/repository/prisma/adapter/academic-publication-simplified'
import type { AcademicPublication, Prisma } from '@prisma/generated/client'

export interface AcademicPublicationsRepository {
  create: (data: Prisma.AcademicPublicationUncheckedCreateInput) => Promise<AcademicPublication>
  createMany: (data: Prisma.AcademicPublicationUncheckedCreateInput[]) => Promise<void>
  findById: (id: number) => Promise<AcademicPublication | null>
  findManyByUserId: (userId: number) => Promise<AcademicPublication[]>
  listAllAcademicPublications: (
    query?: ListAllAcademicPublicationsQuery,
  ) => Promise<PaginatedResult<CustomAcademicPublicationWithSimplifiedDetails[]>>
  delete: (id: number) => Promise<void>
  update: (query: UpdateAcademicPublicationQuery) => Promise<AcademicPublication>
}
