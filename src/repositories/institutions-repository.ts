import type { PaginatedResult } from '@custom-types/pagination-meta-type'
import type { PaginationType } from '@custom-types/pagination-type'
import type { Institution, Prisma } from '@prisma/client'
import type { GetAllInstitutionsWithUsersQuerySchemaType } from '@schemas/institution/get-all-institutions-with-users-query-schema'

export interface ListAllInstitutionsWithUsersQuery extends GetAllInstitutionsWithUsersQuerySchemaType {}

export interface InstitutionsUsersCount {
  name: string
  usersCount: number
}

export interface ListAllInstitutionsNamesQuery extends PaginationType {}

export interface InstitutionsRepository {
  create: (data: Prisma.InstitutionUncheckedCreateInput) => Promise<Institution>
  findById: (id: number) => Promise<Institution | null>
  findByName: (name: string) => Promise<Institution | null>
  listAllInstitutionsNames: (query?: ListAllInstitutionsNamesQuery) => Promise<PaginatedResult<string[]>>
  listAllInstitutionsWithUsersCount: (
    query?: ListAllInstitutionsWithUsersQuery,
  ) => Promise<PaginatedResult<InstitutionsUsersCount[]>>
}
