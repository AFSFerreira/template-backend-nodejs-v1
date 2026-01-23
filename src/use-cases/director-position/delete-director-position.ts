import type {
  DeleteDirectorPositionUseCaseRequest,
  DeleteDirectorPositionUseCaseResponse,
} from '@custom-types/use-cases/director-position/delete-director-position'
import type { DatabaseContext } from '@lib/prisma/helpers/database-context'
import type { DirectorPositionsRepository } from '@repositories/director-positions-repository'
import { logger } from '@lib/logger'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { DIRECTOR_POSITION_DELETION_SUCCESSFUL } from '@messages/loggings/models/director-position-loggings'
import { DirectorPositionNotFoundError } from '@use-cases/errors/director-position/director-position-not-found-error'
import { ensureExists } from '@utils/validators/ensure'
import { inject, injectable } from 'tsyringe'

@injectable()
export class DeleteDirectorPositionUseCase {
  constructor(
    @inject(tsyringeTokens.repositories.directorPositions)
    private readonly directorPositionsRepository: DirectorPositionsRepository,

    @inject(tsyringeTokens.infra.database)
    private readonly dbContext: DatabaseContext,
  ) {}

  async execute({ publicId }: DeleteDirectorPositionUseCaseRequest): Promise<DeleteDirectorPositionUseCaseResponse> {
    await this.dbContext.runInTransaction(async () => {
      const directorPosition = ensureExists({
        value: await this.directorPositionsRepository.findUniqueBy({ publicId }),
        error: new DirectorPositionNotFoundError(),
      })

      await this.directorPositionsRepository.delete(directorPosition.id)
    })

    logger.info({ directorPositionPublicId: publicId }, DIRECTOR_POSITION_DELETION_SUCCESSFUL)

    return {}
  }
}
