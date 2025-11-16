import type { PaginatedResult } from '@custom-types/custom/pagination-meta-type'
import type { listAllDirectorBoardMembers } from '@custom-types/repositories/director-board/list-all-director-board-members'
import type { DirectorBoardWithUser } from '@custom-types/validator/director-board-with-user'

export interface DirectorBoardRepository {
  listAllDirectorBoardMembers: (
    query?: listAllDirectorBoardMembers,
  ) => Promise<PaginatedResult<DirectorBoardWithUser[]>>
}
