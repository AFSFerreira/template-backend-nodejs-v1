import type { DirectorBoardWithUserRefactored } from '@custom-types/custom/director-board-with-user-refactored'

export interface DirectorBoardDefaultPresenterInput extends DirectorBoardWithUserRefactored {}

export interface HTTPDirectorBoard {
  id: string
  profileImage: string
  publicName: string
  position: string
}
