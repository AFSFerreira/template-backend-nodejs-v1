import type {
  DeleteDirectorBoardUseCaseRequest,
  DeleteDirectorBoardUseCaseResponse,
} from '@custom-types/use-cases/director-board/delete-director-board'
import type { DatabaseContext } from '@lib/prisma/helpers/database-context'
import type { DirectorBoardRepository } from '@repositories/directors-board-repository'
import { deleteFileEnqueued } from '@jobs/queues/facades/file-queue-facade'
import { logger } from '@lib/logger'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
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
      await deleteFileEnqueued({
        filePath: buildDirectorBoardProfileImagePath(directorBoard.profileImage),
      })
    }

    logger.info({ directorBoardPublicId: directorBoard.publicId }, DIRECTOR_BOARD_DELETION_SUCCESSFUL)

    return {}
  }
}
