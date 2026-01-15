import type { DirectorBoardWithUserRefactored } from '@custom-types/custom/director-board-with-user-refactored'
import type { CreateDirectorBoardBodySchemaType } from '@custom-types/http/schemas/director-board/create-director-board-body-schema'

export interface CreateDirectorBoardUseCaseRequest extends CreateDirectorBoardBodySchemaType {}

export interface CreateDirectorBoardUseCaseResponse {
  directorBoard: DirectorBoardWithUserRefactored
}
