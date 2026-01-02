import type { DirectorBoardWithUser } from '@custom-types/validators/director-board-with-user'

export interface DirectorBoardDefaultPresenterInput extends Omit<DirectorBoardWithUser, 'aboutMe'> {
  aboutMe: string
}

export interface HTTPDirectorBoard {
  id: string
  profileImage: string
  publicName: string
  position: string
}
