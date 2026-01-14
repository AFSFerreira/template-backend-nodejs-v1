import type { DirectorBoardWithUserRefactored } from '@custom-types/custom/director-board-with-user-refactored'
import type { JSONContent } from '@tiptap/core'

export interface DirectorBoardWithUserForAdminPresenterInput extends DirectorBoardWithUserRefactored {}

export interface HTTPDirectorBoardWithUserForAdmin {
  id: string
  publicName: string
  profileImage: string
  position: string
  linkLattes: string | null
  aboutMe: JSONContent
}
