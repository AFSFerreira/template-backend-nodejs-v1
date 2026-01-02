import type {
  FindDirectorBoardByPublicIdUseCaseRequest,
  FindDirectorBoardByPublicIdUseCaseResponse,
} from '@custom-types/use-cases/director-board/find-by-public-id'
import type { DirectorBoardRepository } from '@repositories/directors-board-repository'
import type { JSONContent } from '@tiptap/core'
import { tiptapConfiguration } from '@lib/tiptap/helpers/configuration'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import { buildDirectorBoardProfileImageUrl } from '@services/builders/urls/build-director-board-profile-image-url'
import { generateHTML } from '@tiptap/html'
import { ensureExists } from '@utils/validators/ensure'
import { inject, injectable } from 'tsyringe'
import { DirectorBoardNotFoundError } from '../errors/director-board/director-board-not-found-error'

@injectable()
export class FindDirectorBoardByPublicIdUseCase {
  constructor(
    @inject(tokens.repositories.directorsBoard)
    private readonly directorBoardRepository: DirectorBoardRepository,
  ) {}

  async execute({
    publicId,
  }: FindDirectorBoardByPublicIdUseCaseRequest): Promise<FindDirectorBoardByPublicIdUseCaseResponse> {
    const directorBoard = ensureExists({
      value: await this.directorBoardRepository.findByPublicId(publicId),
      error: new DirectorBoardNotFoundError(),
    })

    return {
      directorBoard: {
        ...directorBoard,
        profileImage: buildDirectorBoardProfileImageUrl(directorBoard.profileImage),
        aboutMe: generateHTML(directorBoard.aboutMe as JSONContent, tiptapConfiguration),
      },
    }
  }
}
