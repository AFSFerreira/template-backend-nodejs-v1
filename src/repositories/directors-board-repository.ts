import type { PaginatedResult } from '@custom-types/custom/pagination-meta-type'
import type { CreateDirectorBoardQuery } from '@custom-types/repository/director-board/create-director-board-query'
import type { listAllDirectorBoardMembers } from '@custom-types/repository/director-board/list-all-director-board-members'
import type { DirectorBoardWithUser } from '@custom-types/validators/director-board-with-user'
import type { DirectorBoard } from '@prisma/client'

export interface DirectorBoardRepository {
  create: (data: CreateDirectorBoardQuery) => Promise<DirectorBoard>
  deleteByUserId: (userId: number) => Promise<void>
  listAllDirectorBoardMembers: (
    query?: listAllDirectorBoardMembers,
  ) => Promise<PaginatedResult<DirectorBoardWithUser[]>>
}
