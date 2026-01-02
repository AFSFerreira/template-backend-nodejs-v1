import type { CreateDirectorBoardBodySchemaType } from '@custom-types/schemas/director-board/create-director-board-body-schema'
import type { DirectorBoard } from '@prisma/client'

export interface CreateDirectorBoardUseCaseRequest extends CreateDirectorBoardBodySchemaType {}

export interface CreateDirectorBoardUseCaseResponse {
  directorBoard: DirectorBoard
}
