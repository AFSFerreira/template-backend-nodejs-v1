import type {
  CreateDirectorPositionUseCaseRequest,
  CreateDirectorPositionUseCaseResponse,
} from '@custom-types/use-cases/director-position/create-director-position'
import type { DatabaseContext } from '@lib/prisma/helpers/database-context'
import type { DirectorPositionsRepository } from '@repositories/director-positions-repository'
import { logger } from '@lib/logger'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { DIRECTOR_POSITION_CREATED_SUCCESSFULLY } from '@messages/loggings/models/director-position-loggings'
import { DirectorPositionAlreadyExistsError } from '@use-cases/errors/director-position/director-position-already-exists-error'
import { ensureNotExists } from '@utils/validators/ensure'
import { inject, injectable } from 'tsyringe'

@injectable()
export class CreateDirectorPositionUseCase {
  constructor(
    @inject(tsyringeTokens.repositories.directorPositions)
    private readonly directorPositionsRepository: DirectorPositionsRepository,

    @inject(tsyringeTokens.infra.database)
    private readonly dbContext: DatabaseContext,
  ) {}

  async execute(
    createDirectorPositionUsecaseInput: CreateDirectorPositionUseCaseRequest,
  ): Promise<CreateDirectorPositionUseCaseResponse> {
    const { directorPosition } = await this.dbContext.runInTransaction(async () => {
      ensureNotExists({
        value: await this.directorPositionsRepository.findUniqueBy({
          position: createDirectorPositionUsecaseInput.position,
        }),
        error: new DirectorPositionAlreadyExistsError(),
      })

      const createdPosition = await this.directorPositionsRepository.create(createDirectorPositionUsecaseInput)

      return { directorPosition: createdPosition }
    })

    logger.info(createDirectorPositionUsecaseInput, DIRECTOR_POSITION_CREATED_SUCCESSFULLY)

    return { directorPosition }
  }
}
