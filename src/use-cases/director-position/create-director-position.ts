import type {
  CreateDirectorPositionUseCaseRequest,
  CreateDirectorPositionUseCaseResponse,
} from '@custom-types/use-cases/director-position/create-director-position'
import type { DatabaseContext } from '@lib/prisma/helpers/database-context'
import type { DirectorPositionsRepository } from '@repositories/director-positions-repository'
import { logger } from '@lib/logger'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import { DIRECTOR_POSITION_CREATED_SUCCESSFULLY } from '@messages/loggings/director-position-loggings'
import { DirectorPositionAlreadyExistsError } from '@use-cases/errors/director-position/director-position-already-exists-error'
import { inject, injectable } from 'tsyringe'

@injectable()
export class CreateDirectorPositionUseCase {
  constructor(
    @inject(tokens.repositories.directorPositions)
    private readonly directorPositionsRepository: DirectorPositionsRepository,

    @inject(tokens.infra.database)
    private readonly dbContext: DatabaseContext,
  ) {}

  async execute({
    position,
    precedence,
  }: CreateDirectorPositionUseCaseRequest): Promise<CreateDirectorPositionUseCaseResponse> {
    const directorPosition = await this.dbContext.runInTransaction(async () => {
      const existingPosition = await this.directorPositionsRepository.findUniqueBy({ position })

      if (existingPosition) {
        throw new DirectorPositionAlreadyExistsError()
      }

      const createdPosition = await this.directorPositionsRepository.create({
        position,
        precedence,
      })

      return createdPosition
    })

    logger.info({ position, precedence }, DIRECTOR_POSITION_CREATED_SUCCESSFULLY)

    return { directorPosition }
  }
}
