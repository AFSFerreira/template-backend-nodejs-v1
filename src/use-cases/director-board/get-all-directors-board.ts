import type {
  GetAllDirectorBoardUseCaseRequest,
  GetAllDirectorBoardUseCaseResponse,
} from '@custom-types/use-cases/director-board/get-all-directors-board'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import type { DirectorBoardRepository } from '@repositories/directors-board-repository'
import { inject, injectable } from 'tsyringe'

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

    return membersInfo as GetAllDirectorBoardUseCaseResponse
  }
}
