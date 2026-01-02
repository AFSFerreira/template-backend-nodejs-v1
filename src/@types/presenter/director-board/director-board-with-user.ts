import type { DirectorBoardWithUser } from '@custom-types/validators/director-board-with-user'

export interface DirectorBoardWithUserPresenterInput extends Omit<DirectorBoardWithUser, 'aboutMe'> {
  aboutMe: string
}

export interface HTTPDirectorBoardWithUser {
  id: string
  publicName: string
  profileImage: string
  position: string
  linkLattes: string | null
  aboutMe: string // HTML do prose mirror compilado
}
