import type { DirectorBoardWithUserRefactored } from '@custom-types/custom/director-board-with-user-refactored'
import type { UpdateDirectorBoardBodySchemaType } from '@custom-types/schemas/director-board/update-director-board-body-schema'

export interface UpdateDirectorBoardUseCaseRequest {
  publicId: string
  data: UpdateDirectorBoardBodySchemaType
}

export interface UpdateDirectorBoardUseCaseResponse {
  directorBoard: DirectorBoardWithUserRefactored
}
