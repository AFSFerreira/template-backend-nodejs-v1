import type {
  DeleteDirectorBoardUseCaseRequest,
  DeleteDirectorBoardUseCaseResponse,
} from '@custom-types/use-cases/director-board/delete-director-board'
import type { DatabaseContext } from '@lib/prisma/helpers/database-context'
import type { DirectorBoardRepository } from '@repositories/directors-board-repository'
import type { UserActionAuditsRepository } from '@repositories/user-action-audits-repository'
import type { UsersRepository } from '@repositories/users-repository'
import { deleteFileEnqueued } from '@jobs/queues/facades/file-queue-facade'
import { logger } from '@lib/pino'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { DIRECTOR_BOARD_DELETION_SUCCESSFUL } from '@messages/loggings/models/director-board-loggings'
import { SystemActionType } from '@prisma/generated/enums'
import { DirectorBoardHtmlCacheService } from '@services/caches/director-board-html-cache'
import { DirectorBoardNotFoundError } from '@use-cases/errors/director-board/director-board-not-found-error'
import { UserNotFoundError } from '@use-cases/errors/user/user-not-found-error'
import { buildDirectorBoardProfileImagePath } from '@utils/builders/paths/build-director-board-profile-image-path'
import { ensureExists } from '@utils/validators/ensure'
import { inject, singleton } from 'tsyringe'

@singleton()
export class DeleteDirectorBoardUseCase {
  constructor(
    @inject(tsyringeTokens.repositories.directorsBoard)
    private readonly directorBoardRepository: DirectorBoardRepository,

    @inject(tsyringeTokens.repositories.users)
    private readonly usersRepository: UsersRepository,

    @inject(tsyringeTokens.repositories.userActionAudits)
    private readonly userActionAuditsRepository: UserActionAuditsRepository,

    @inject(tsyringeTokens.infra.database)
    private readonly dbContext: DatabaseContext,

    @inject(DirectorBoardHtmlCacheService)
    private readonly directorBoardHtmlCacheService: DirectorBoardHtmlCacheService,
  ) {}

  async execute({ publicId, audit }: DeleteDirectorBoardUseCaseRequest): Promise<DeleteDirectorBoardUseCaseResponse> {
    const directorBoard = ensureExists({
      value: await this.directorBoardRepository.findByPublicId(publicId),
      error: new DirectorBoardNotFoundError(),
    })

    const actor = ensureExists({
      value: await this.usersRepository.findByPublicId(audit.actorPublicId),
      error: new UserNotFoundError(),
    })

    await this.dbContext.runInTransaction(async () => {
      await this.directorBoardRepository.delete(directorBoard.id)

      await this.userActionAuditsRepository.create({
        actionType: SystemActionType.DIRECTOR_BOARD_DELETED,
        actorId: actor.id,
        targetId: directorBoard.userId,
        ipAddress: audit.ipAddress,
      })
    })

    if (directorBoard.profileImage) {
      await deleteFileEnqueued({
        filePath: buildDirectorBoardProfileImagePath(directorBoard.profileImage),
      })
    }

    // Removendo o cache HTML do director board:
    await this.directorBoardHtmlCacheService.remove(directorBoard.publicId)

    logger.info({ directorBoardPublicId: directorBoard.publicId }, DIRECTOR_BOARD_DELETION_SUCCESSFUL)

    return {}
  }
}
