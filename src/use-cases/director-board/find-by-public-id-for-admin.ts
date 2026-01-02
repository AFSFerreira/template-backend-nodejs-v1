import type {
  FindDirectorBoardByPublicIdForAdminUseCaseRequest,
  FindDirectorBoardByPublicIdForAdminUseCaseResponse,
} from '@custom-types/use-cases/director-board/find-by-public-id-for-admin'
import type { DirectorBoardRepository } from '@repositories/directors-board-repository'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import { buildDirectorBoardProfileImageUrl } from '@services/builders/urls/build-director-board-profile-image-url'
import { buildUserProfileImageUrl } from '@services/builders/urls/build-user-profile-image-url'
import { ensureExists } from '@utils/validators/ensure'
import { inject, injectable } from 'tsyringe'
import { DirectorBoardNotFoundError } from '../errors/director-board/director-board-not-found-error'

@injectable()
export class FindDirectorBoardByPublicIdForAdminUseCase {
  constructor(
    @inject(tokens.repositories.directorsBoard)
    private readonly directorBoardRepository: DirectorBoardRepository,
  ) {}

  async execute({
    publicId,
  }: FindDirectorBoardByPublicIdForAdminUseCaseRequest): Promise<FindDirectorBoardByPublicIdForAdminUseCaseResponse> {
    const directorBoard = ensureExists({
      value: await this.directorBoardRepository.findByPublicId(publicId),
      error: new DirectorBoardNotFoundError(),
    })

    return {
      directorBoard: {
        ...directorBoard,
        profileImage: directorBoard.profileImage
          ? buildDirectorBoardProfileImageUrl(directorBoard.profileImage)
          : buildUserProfileImageUrl(directorBoard.User.profileImage),
      },
    }
  }
}
