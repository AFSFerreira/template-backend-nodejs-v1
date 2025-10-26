import type { DirectorBoardWithUser } from '@custom-types/director-board-with-user'
import type { PaginatedResult } from '@custom-types/pagination-meta-type'
import type { getAllDirectorBoardSchemaType } from '@schemas/director-board/get-all-director-board-query-schema'

export type listAllDirectorBoardMembers = getAllDirectorBoardSchemaType

export interface DirectorBoardRepository {
  listAllDirectorBoardMembers: (
    query?: listAllDirectorBoardMembers,
  ) => Promise<PaginatedResult<DirectorBoardWithUser[]>>
}
