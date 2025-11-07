import type { DirectorBoardWithUser } from '@custom-types/director-board-with-user'
import type { PaginatedResult } from '@custom-types/pagination-meta-type'
import type { DirectorBoardRepository } from '@repositories/directors-board-repository'
import type { getAllDirectorBoardSchemaType } from '@schemas/director-board/get-all-director-board-query-schema'

interface GetAllDirectorBoardUseCaseRequest extends getAllDirectorBoardSchemaType {}

interface GetAllDirectorBoardUseCaseResponse extends PaginatedResult<DirectorBoardWithUser[]> {}

export class GetAllDirectorsBoard {
  constructor(private readonly directorBoardRepository: DirectorBoardRepository) {}

  async execute(
    getAllDirectorBoardUseCaseInput: GetAllDirectorBoardUseCaseRequest,
  ): Promise<GetAllDirectorBoardUseCaseResponse> {
    const membersInfo = await this.directorBoardRepository.listAllDirectorBoardMembers(getAllDirectorBoardUseCaseInput)

    return membersInfo as GetAllDirectorBoardUseCaseResponse
  }
}
