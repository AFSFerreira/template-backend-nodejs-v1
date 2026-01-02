import type { DirectorBoardWithUserRefactored } from '@custom-types/custom/director-board-with-user-refactored'
import type { PaginatedResult } from '@custom-types/custom/pagination-meta-type'
import type { GetAllDirectorBoardSchemaType } from '@custom-types/schemas/director-board/get-all-director-board-query-schema'

export interface GetAllDirectorBoardUseCaseRequest extends GetAllDirectorBoardSchemaType {}

export interface GetAllDirectorBoardUseCaseResponse extends PaginatedResult<Array<DirectorBoardWithUserRefactored>> {}
