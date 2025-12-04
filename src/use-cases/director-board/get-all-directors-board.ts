import type {
  GetAllDirectorBoardUseCaseRequest,
  GetAllDirectorBoardUseCaseResponse,
} from '@custom-types/use-cases/director-board/get-all-directors-board'
import type { DirectorBoardRepository } from '@repositories/directors-board-repository'

export class GetAllDirectorsBoard {
  constructor(private readonly directorBoardRepository: DirectorBoardRepository) {}

  async execute(
    getAllDirectorBoardUseCaseInput: GetAllDirectorBoardUseCaseRequest,
  ): Promise<GetAllDirectorBoardUseCaseResponse> {
    const membersInfo = await this.directorBoardRepository.listAllDirectorBoardMembers(getAllDirectorBoardUseCaseInput)

    return membersInfo as GetAllDirectorBoardUseCaseResponse
  }
}
