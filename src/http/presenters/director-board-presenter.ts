import type { DirectorBoardWithUser } from '@custom-types/director-board-with-user'

interface HTTPDirectorBoardInfo {
  id: string
  fullName: string
  directorBoardProfileImage: string
  position: string
  linkLattes?: string
  aboutMe: string
}

export class DirectorBoardPresenter {
  static toHTTPSimplified(directorBoardMember: DirectorBoardWithUser): HTTPDirectorBoardInfo
  static toHTTPSimplified(directorBoardMembers: DirectorBoardWithUser[]): HTTPDirectorBoardInfo[]
  static toHTTPSimplified(
    input: DirectorBoardWithUser | DirectorBoardWithUser[],
  ): HTTPDirectorBoardInfo | HTTPDirectorBoardInfo[] {
    if (Array.isArray(input)) {
      return input.map((member) => DirectorBoardPresenter.toHTTPSimplified(member))
    }

    return {
      id: input.User.publicId,
      fullName: input.User.fullName,
      directorBoardProfileImage: input.directorBoardProfileImage,
      position: input.DirectorPosition.position,
      linkLattes: input.User.linkLattes,
      aboutMe: input.aboutMe,
    }
  }
}
