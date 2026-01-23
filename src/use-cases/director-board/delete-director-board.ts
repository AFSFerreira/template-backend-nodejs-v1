import type {
  DeleteDirectorBoardUseCaseRequest,
  DeleteDirectorBoardUseCaseResponse,
} from '@custom-types/use-cases/director-board/delete-director-board'
import type { DatabaseContext } from '@lib/prisma/helpers/database-context'
import type { DirectorBoardRepository } from '@repositories/directors-board-repository'
import { fileQueue } from '@jobs/queues/definitions/file-queue'
import { logger } from '@lib/logger'
import { logError } from '@lib/logger/helpers/log-error'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { FAILED_TO_ENQUEUE_FILE_JOB } from '@messages/loggings/jobs/queues/files'
import { DIRECTOR_BOARD_DELETION_SUCCESSFUL } from '@messages/loggings/models/director-board-loggings'
import { buildDirectorBoardProfileImagePath } from '@services/builders/paths/build-director-board-profile-image-path'
import { DirectorBoardNotFoundError } from '@use-cases/errors/director-board/director-board-not-found-error'
import { ensureExists } from '@utils/validators/ensure'
import { inject, injectable } from 'tsyringe'

@injectable()
export class DeleteDirectorBoardUseCase {
  constructor(
    @inject(tsyringeTokens.repositories.directorsBoard)
    private readonly directorBoardRepository: DirectorBoardRepository,

    @inject(tsyringeTokens.infra.database)
    private readonly dbContext: DatabaseContext,
  ) {}

  async execute({ publicId }: DeleteDirectorBoardUseCaseRequest): Promise<DeleteDirectorBoardUseCaseResponse> {
    const { directorBoard } = await this.dbContext.runInTransaction(async () => {
      const directorBoard = ensureExists({
        value: await this.directorBoardRepository.findByPublicId(publicId),
        error: new DirectorBoardNotFoundError(),
      })

      await this.directorBoardRepository.delete(directorBoard.id)

      return { directorBoard }
    })

    if (directorBoard.profileImage) {
      try {
        fileQueue.add('delete', {
          type: 'delete',
          filePath: buildDirectorBoardProfileImagePath(directorBoard.profileImage),
        })
      } catch (error) {
        logError({
          error,
          message: FAILED_TO_ENQUEUE_FILE_JOB,
        })
      }
    }

    logger.info({ directorBoardPublicId: directorBoard.publicId }, DIRECTOR_BOARD_DELETION_SUCCESSFUL)

    return {}
  }
}
