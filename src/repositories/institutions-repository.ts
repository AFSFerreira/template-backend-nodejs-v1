import type { PaginatedResult } from '@custom-types/custom/pagination-meta-type'
import type { InstitutionsUsersCount } from '@custom-types/repository/institution/institutions-users-count'
import type { ListAllInstitutionsNamesQuery } from '@custom-types/repository/institution/list-all-institutions-names-query'
import type { ListAllInstitutionsWithUsersQuery } from '@custom-types/repository/institution/list-all-institutions-with-users-query'
import type { Institution, Prisma } from '@prisma/client'

export interface InstitutionsRepository {
  create: (data: Prisma.InstitutionUncheckedCreateInput) => Promise<Institution>
  findById: (id: number) => Promise<Institution | null>
  findByName: (name: string) => Promise<Institution | null>
  listAllInstitutionsNames: (query?: ListAllInstitutionsNamesQuery) => Promise<PaginatedResult<string[]>>
  listAllInstitutionsWithUsersCount: (
    query?: ListAllInstitutionsWithUsersQuery,
  ) => Promise<PaginatedResult<InstitutionsUsersCount[]>>
}
