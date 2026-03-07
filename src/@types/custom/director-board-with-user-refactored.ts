import type { DirectorBoardWithUser } from '@custom-types/validators/director-board-with-user'

export interface DirectorBoardWithUserRefactored extends Omit<DirectorBoardWithUser, 'profileImage'> {
  profileImage: string | null
}
