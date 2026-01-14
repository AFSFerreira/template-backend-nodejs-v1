import type { PaginatedResult } from '@custom-types/custom/pagination-meta-type'
import type { CreateDirectorBoardQuery } from '@custom-types/repository/prisma/director-board/create-director-board-query'
import type { listAllDirectorBoardMembers } from '@custom-types/repository/prisma/director-board/list-all-director-board-members'
import type { UpdateDirectorBoardQuery } from '@custom-types/repository/prisma/director-board/update-director-board-query'
import type { DirectorBoardWithUser } from '@custom-types/validators/director-board-with-user'
import type { DirectorBoard } from '@prisma/client'

export interface DirectorBoardRepository {
  create: (data: CreateDirectorBoardQuery) => Promise<DirectorBoardWithUser>
  update: (query: UpdateDirectorBoardQuery) => Promise<DirectorBoardWithUser>
  findByUserId: (userId: number) => Promise<DirectorBoard | null>
  findByDirectorPositionId: (directorPositionId: number) => Promise<DirectorBoard | null>
  findByPublicId: (publicId: string) => Promise<DirectorBoardWithUser | null>
  delete: (id: number) => Promise<void>
  deleteByUserId: (userId: number) => Promise<void>
  listAllDirectorBoardMembers: (
    query?: listAllDirectorBoardMembers,
  ) => Promise<PaginatedResult<DirectorBoardWithUser[]>>
}
