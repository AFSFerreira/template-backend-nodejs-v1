import type {
  GetAllDirectorBoardUseCaseRequest,
  GetAllDirectorBoardUseCaseResponse,
} from '@custom-types/use-cases/director-board/get-all-directors-board'
import type { DirectorBoardRepository } from '@repositories/directors-board-repository'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { inject, singleton } from 'tsyringe'

@singleton()
export class GetAllDirectorsBoard {
  constructor(
    @inject(tsyringeTokens.repositories.directorsBoard)
    private readonly directorBoardRepository: DirectorBoardRepository,
  ) {}

  async execute(
    getAllDirectorBoardUseCaseInput: GetAllDirectorBoardUseCaseRequest,
  ): Promise<GetAllDirectorBoardUseCaseResponse> {
    const membersInfo = await this.directorBoardRepository.listAllDirectorBoardMembers(getAllDirectorBoardUseCaseInput)

    return membersInfo
  }
}
