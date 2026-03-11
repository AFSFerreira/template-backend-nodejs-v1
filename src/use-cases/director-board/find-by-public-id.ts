import type {
  FindDirectorBoardByPublicIdUseCaseRequest,
  FindDirectorBoardByPublicIdUseCaseResponse,
} from '@custom-types/use-cases/director-board/find-by-public-id'
import type { DirectorBoardRepository } from '@repositories/directors-board-repository'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { ensureExists } from '@utils/validators/ensure'
import { inject, singleton } from 'tsyringe'
import { DirectorBoardNotFoundError } from '../errors/director-board/director-board-not-found-error'

@singleton()
export class FindDirectorBoardByPublicIdUseCase {
  constructor(
    @inject(tsyringeTokens.repositories.directorsBoard)
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
      directorBoard,
    }
  }
}
