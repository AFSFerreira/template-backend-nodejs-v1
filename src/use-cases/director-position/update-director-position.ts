import type {
  UpdateDirectorPositionUseCaseRequest,
  UpdateDirectorPositionUseCaseResponse,
} from '@custom-types/use-cases/director-position/update-director-position'
import type { DirectorPositionsRepository } from '@repositories/director-positions-repository'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { DirectorPositionNotFoundError } from '@use-cases/errors/director-position/director-position-not-found-error'
import { ensureExists } from '@utils/validators/ensure'
import { inject, singleton } from 'tsyringe'

@singleton()
export class UpdateDirectorPositionUseCase {
  constructor(
    @inject(tsyringeTokens.repositories.directorPositions)
    private readonly directorPositionsRepository: DirectorPositionsRepository,
  ) {}

  async execute({
    publicId,
    data,
  }: UpdateDirectorPositionUseCaseRequest): Promise<UpdateDirectorPositionUseCaseResponse> {
    const foundDirectorPosition = ensureExists({
      value: await this.directorPositionsRepository.findUniqueBy({ publicId }),
      error: new DirectorPositionNotFoundError(),
    })

    const shouldUpdate = Object.keys(data).length > 0

    const directorPosition = shouldUpdate
      ? await this.directorPositionsRepository.update({
          id: foundDirectorPosition.id,
          data,
        })
      : foundDirectorPosition

    return { directorPosition }
  }
}
