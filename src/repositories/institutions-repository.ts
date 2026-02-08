import type { PaginatedResult } from '@custom-types/custom/pagination-meta-type'
import type { InstitutionsUsersCount } from '@custom-types/repository/prisma/institution/institutions-users-count'
import type { ListAllInstitutionsNamesQuery } from '@custom-types/repository/prisma/institution/list-all-institutions-names-query'
import type { ListAllInstitutionsWithUsersQuery } from '@custom-types/repository/prisma/institution/list-all-institutions-with-users-query'
import type { UpdateInstitutionQuery } from '@custom-types/repository/prisma/institution/update-institution-query'
import type { Institution, Prisma } from '@prisma/generated/client'

export interface InstitutionsRepository {
  create: (data: Prisma.InstitutionUncheckedCreateInput) => Promise<Institution>
  findById: (id: number) => Promise<Institution | null>
  findByName: (name: string) => Promise<Institution | null>
  findByPublicId: (publicId: string) => Promise<Institution | null>
  update: (query: UpdateInstitutionQuery) => Promise<Institution>
  delete: (id: number) => Promise<void>
  listAllInstitutionsNames: (query: ListAllInstitutionsNamesQuery) => Promise<PaginatedResult<Institution[]>>
  listAllInstitutionsWithUsersCount: (
    query: ListAllInstitutionsWithUsersQuery,
  ) => Promise<PaginatedResult<InstitutionsUsersCount[]>>
}
