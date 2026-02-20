import type {
  GetAllDirectorBoardUseCaseRequest,
  GetAllDirectorBoardUseCaseResponse,
} from '@custom-types/use-cases/director-board/get-all-directors-board'
import type { DirectorBoardRepository } from '@repositories/directors-board-repository'
import { logError } from '@lib/pino/helpers/log-error'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { DIRECTOR_BOARD_LIST_ERROR } from '@messages/loggings/models/director-board-loggings'
import { buildDirectorBoardProfileImageUrl } from '@services/builders/urls/build-director-board-profile-image-url'
import { buildUserProfileImageUrl } from '@services/builders/urls/build-user-profile-image-url'
import { inject, injectable } from 'tsyringe'
import { DirectorBoardListError } from '../errors/director-board/director-board-list-error'

@injectable()
export class GetAllDirectorsBoard {
  constructor(
    @inject(tsyringeTokens.repositories.directorsBoard)
    private readonly directorBoardRepository: DirectorBoardRepository,
  ) {}

  async execute(
    getAllDirectorBoardUseCaseInput: GetAllDirectorBoardUseCaseRequest,
  ): Promise<GetAllDirectorBoardUseCaseResponse> {
    const membersInfo = await this.directorBoardRepository.listAllDirectorBoardMembers(getAllDirectorBoardUseCaseInput)

    try {
      const formattedMembersDataInfo = membersInfo.data.map((member) => ({
        ...member,
        profileImage: member.profileImage
          ? buildDirectorBoardProfileImageUrl(member.profileImage)
          : buildUserProfileImageUrl(member.User.profileImage),
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
