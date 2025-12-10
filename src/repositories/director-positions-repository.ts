import type { PaginatedResult } from '@custom-types/custom/pagination-meta-type'
import type { ListAllDirectorPositionsQuery } from '@custom-types/repository/director-position/list-all-director-positions-query'
import type { DirectorPosition, Prisma } from '@prisma/client'

export interface DirectorPositionsRepository {
  create: (data: Prisma.DirectorPositionCreateInput) => Promise<DirectorPosition>
  findUniqueBy: (where: Prisma.DirectorPositionWhereUniqueInput) => Promise<DirectorPosition | null>
  listAll: (query?: ListAllDirectorPositionsQuery) => Promise<PaginatedResult<DirectorPosition[]>>
  delete: (id: number) => Promise<void>
}
