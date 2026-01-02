import type { DirectorBoardWithUserRefactored } from '@custom-types/custom/director-board-with-user-refactored'

export interface FindDirectorBoardByPublicIdForAdminUseCaseRequest {
  publicId: string
}

export interface FindDirectorBoardByPublicIdForAdminUseCaseResponse {
  directorBoard: DirectorBoardWithUserRefactored
}
