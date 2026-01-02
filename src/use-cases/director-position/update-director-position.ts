import type {
  UpdateDirectorPositionUseCaseRequest,
  UpdateDirectorPositionUseCaseResponse,
} from '@custom-types/use-cases/director-position/update-director-position'
import type { DatabaseContext } from '@lib/prisma/helpers/database-context'
import type { DirectorPositionsRepository } from '@repositories/director-positions-repository'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import { DirectorPositionNotFoundError } from '@use-cases/errors/director-position/director-position-not-found-error'
import { ensureExists } from '@utils/validators/ensure'
import { inject, injectable } from 'tsyringe'

@injectable()
export class UpdateDirectorPositionUseCase {
  constructor(
    @inject(tokens.repositories.directorPositions)
    private readonly directorPositionsRepository: DirectorPositionsRepository,

    @inject(tokens.infra.database)
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

      const updatedDirectorPosition = await this.directorPositionsRepository.update({
        id: directorPosition.id,
        data,
      })

      return { directorPosition: updatedDirectorPosition }
    })

    return { directorPosition }
  }
}
