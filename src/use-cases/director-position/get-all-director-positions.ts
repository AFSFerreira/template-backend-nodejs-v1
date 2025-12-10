import type {
  GetAllDirectorPositionsUseCaseRequest,
  GetAllDirectorPositionsUseCaseResponse,
} from '@custom-types/use-cases/director-position/get-all-director-positions'
import type { DirectorPositionsRepository } from '@repositories/director-positions-repository'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import { inject, injectable } from 'tsyringe'

@injectable()
export class GetAllDirectorPositionsUseCase {
  constructor(
    @inject(tokens.repositories.directorPositions)
    private readonly directorPositionsRepository: DirectorPositionsRepository,
  ) {}

  async execute(query: GetAllDirectorPositionsUseCaseRequest): Promise<GetAllDirectorPositionsUseCaseResponse> {
    const directorPositionsInfo = await this.directorPositionsRepository.listAll(query)

    return directorPositionsInfo
  }
}
