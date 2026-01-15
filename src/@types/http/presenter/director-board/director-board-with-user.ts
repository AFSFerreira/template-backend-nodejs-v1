import type { DirectorBoardWithUserRefactored } from '@custom-types/custom/director-board-with-user-refactored'

export interface DirectorBoardWithUserPresenterInput extends DirectorBoardWithUserRefactored {}

export interface HTTPDirectorBoardWithUser {
  id: string
  publicName: string
  profileImage: string
  position: string
  linkLattes: string | null
}
