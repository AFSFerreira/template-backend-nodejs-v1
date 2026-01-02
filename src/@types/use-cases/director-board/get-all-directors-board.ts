import type { PaginatedResult } from '@custom-types/custom/pagination-meta-type'
import type { GetAllDirectorBoardSchemaType } from '@custom-types/schemas/director-board/get-all-director-board-query-schema'
import type { DirectorBoardWithUser } from '@custom-types/validators/director-board-with-user'

export interface GetAllDirectorBoardUseCaseRequest extends GetAllDirectorBoardSchemaType {}

export interface GetAllDirectorBoardUseCaseResponse
  extends PaginatedResult<Array<Omit<DirectorBoardWithUser, 'aboutMe'> & { aboutMe: string }>> {}
