import type {
  GetAllDirectorBoardUseCaseRequest,
  GetAllDirectorBoardUseCaseResponse,
} from '@custom-types/use-cases/director-board/get-all-directors-board'
import type { DirectorBoardRepository } from '@repositories/directors-board-repository'
import type { JSONContent } from '@tiptap/core'
import { logError } from '@lib/logger/helpers/log-error'
import { tiptapConfiguration } from '@lib/tiptap/helpers/configuration'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import { DIRECTOR_BOARD_LIST_ERROR } from '@messages/loggings/director-board-loggings'
import { buildDirectorBoardProfileImageUrl } from '@services/builders/urls/build-director-board-profile-image-url'
import { generateHTML } from '@tiptap/html'
import { inject, injectable } from 'tsyringe'
import { DirectorBoardListError } from '../errors/director-board/director-board-list-error'

@injectable()
export class GetAllDirectorsBoard {
  constructor(
    @inject(tokens.repositories.directorsBoard)
    private readonly directorBoardRepository: DirectorBoardRepository,
  ) {}

  async execute(
    getAllDirectorBoardUseCaseInput: GetAllDirectorBoardUseCaseRequest,
  ): Promise<GetAllDirectorBoardUseCaseResponse> {
    const membersInfo = await this.directorBoardRepository.listAllDirectorBoardMembers(getAllDirectorBoardUseCaseInput)

    try {
      const formattedMembersDataInfo = membersInfo.data.map((member) => ({
        ...member,
        aboutMe: generateHTML(member.aboutMe as JSONContent, tiptapConfiguration),
        profileImage: buildDirectorBoardProfileImageUrl(member.profileImage),
      }))

      return {
        ...membersInfo,
        data: formattedMembersDataInfo,
      }
    } catch (error) {
      logError({ error, message: DIRECTOR_BOARD_LIST_ERROR })
      throw new DirectorBoardListError()
    }
  }
}
