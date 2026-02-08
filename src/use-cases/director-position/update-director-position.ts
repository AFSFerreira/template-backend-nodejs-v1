import type {
  UpdateDirectorPositionUseCaseRequest,
  UpdateDirectorPositionUseCaseResponse,
} from '@custom-types/use-cases/director-position/update-director-position'
import type { DatabaseContext } from '@lib/prisma/helpers/database-context'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import type { DirectorPositionsRepository } from '@repositories/director-positions-repository'
import { DirectorPositionNotFoundError } from '@use-cases/errors/director-position/director-position-not-found-error'
import { ensureExists } from '@utils/validators/ensure'
import { inject, injectable } from 'tsyringe'

@injectable()
export class UpdateDirectorPositionUseCase {
  constructor(
    @inject(tsyringeTokens.repositories.directorPositions)
    private readonly directorPositionsRepository: DirectorPositionsRepository,

    @inject(tsyringeTokens.infra.database)
    private readonly dbContext: DatabaseContext,
  ) {}

  async execute({
    publicId,
    data,
  }: UpdateDirectorPositionUseCaseRequest): Promise<UpdateDirectorPositionUseCaseResponse> {
    const { directorPosition } = await this.dbContext.runInTransaction(async () => {
      const directorPosition = ensureExists({
        value: await this.directorPositionsRepository.findUniqueBy({ publicId }),
        error: new DirectorPositionNotFoundError(),
      })

      const shouldUpdate = Object.keys(data).length > 0

      const updatedDirectorPosition = shouldUpdate
        ? await this.directorPositionsRepository.update({
            id: directorPosition.id,
            data,
          })
        : directorPosition

      return { directorPosition: updatedDirectorPosition }
    })

    return { directorPosition }
  }
}
