import type { DirectorBoardWithUser } from '@custom-types/validators/director-board-with-user'

export interface FindDirectorBoardByPublicIdUseCaseRequest {
  publicId: string
}

export interface FindDirectorBoardByPublicIdUseCaseResponse {
  directorBoard: Omit<DirectorBoardWithUser, 'aboutMe'> & { aboutMe: string }
}
