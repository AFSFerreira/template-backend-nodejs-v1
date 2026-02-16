import type {
  CreateDirectorBoardUseCaseRequest,
  CreateDirectorBoardUseCaseResponse,
} from '@custom-types/use-cases/director-board/create-director-board'
import type { DatabaseContext } from '@lib/prisma/helpers/database-context'
import type { Prisma } from '@prisma/generated/client'
import type { DirectorPositionsRepository } from '@repositories/director-positions-repository'
import type { DirectorBoardRepository } from '@repositories/directors-board-repository'
import type { UsersRepository } from '@repositories/users-repository'
import type { JSONContent } from '@tiptap/core'
import { MANAGER_PERMISSIONS } from '@constants/sets'
import { moveFileEnqueued } from '@jobs/queues/facades/file-queue-facade'
import { tiptapConfiguration } from '@lib/tiptap/helpers/configuration'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { UserRoleType } from '@prisma/generated/enums'
import {
  buildDirectorBoardProfileImagePath,
  buildDirectorBoardTempProfileImagePath,
} from '@services/builders/paths/build-director-board-profile-image-path'
import { buildDirectorBoardProfileImageUrl } from '@services/builders/urls/build-director-board-profile-image-url'
import { buildUserProfileImageUrl } from '@services/builders/urls/build-user-profile-image-url'
import { generateText } from '@tiptap/core'
import { DirectorBoardPositionAlreadyOccupiedError } from '@use-cases/errors/director-board/director-board-position-already-occupied-error'
import { DirectorBoardUserAlreadyExistsError } from '@use-cases/errors/director-board/director-board-user-already-exists-error'
import { DirectorPositionNotFoundError } from '@use-cases/errors/director-position/director-position-not-found-error'
import { InvalidProseMirrorError } from '@use-cases/errors/generic/invalid-prose-mirror-error'
import { UserNotFoundError } from '@use-cases/errors/user/user-not-found-error'
import { ensureExists, ensureNotExists } from '@utils/validators/ensure'
import { inject, injectable } from 'tsyringe'

@injectable()
export class CreateDirectorBoardUseCase {
  constructor(
    @inject(tsyringeTokens.repositories.directorsBoard)
    private readonly directorBoardRepository: DirectorBoardRepository,

    @inject(tsyringeTokens.repositories.users)
    private readonly usersRepository: UsersRepository,

    @inject(tsyringeTokens.repositories.directorPositions)
    private readonly directorPositionsRepository: DirectorPositionsRepository,

    @inject(tsyringeTokens.infra.database)
    private readonly dbContext: DatabaseContext,
  ) {}

  async execute({
    userId,
    positionId,
    profileImage,
    aboutMe,
    publicName,
  }: CreateDirectorBoardUseCaseRequest): Promise<CreateDirectorBoardUseCaseResponse> {
    try {
      generateText(aboutMe as JSONContent, tiptapConfiguration)
    } catch (_error) {
      throw new InvalidProseMirrorError()
    }

    const { directorBoard, user } = await this.dbContext.runInTransaction(async () => {
      const user = ensureExists({
        value: await this.usersRepository.findByPublicId(userId),
        error: new UserNotFoundError(),
      })

      if (!MANAGER_PERMISSIONS.has(user.role)) {
        // Atribui permissão de gestor do sistema automaticamente:
        await this.usersRepository.updateRole({ id: user.id, role: UserRoleType.MANAGER })
      }

      ensureNotExists({
        value: await this.directorBoardRepository.findByUserId(user.id),
        error: new DirectorBoardUserAlreadyExistsError(),
      })

      const directorPosition = ensureExists({
        value: await this.directorPositionsRepository.findUniqueBy({ publicId: positionId }),
        error: new DirectorPositionNotFoundError(),
      })

      ensureNotExists({
        value: await this.directorBoardRepository.findByDirectorPositionId(directorPosition.id),
        error: new DirectorBoardPositionAlreadyOccupiedError(),
      })

      // Criar o registro no banco de dados
      const directorBoard = await this.directorBoardRepository.create({
        userId: user.id,
        directorPositionId: directorPosition.id,
        profileImage,
        aboutMe: aboutMe as Prisma.InputJsonValue,
        publicName,
      })

      return { directorBoard, user }
    })

    const directorBoardProfileImagePaths = profileImage
      ? {
          oldFilePath: buildDirectorBoardTempProfileImagePath(profileImage),
          newFilePath: buildDirectorBoardProfileImagePath(profileImage),
        }
      : undefined

    if (directorBoardProfileImagePaths) {
      await moveFileEnqueued(directorBoardProfileImagePaths)
    }

    return {
      directorBoard: {
        ...directorBoard,
        profileImage: profileImage
          ? buildDirectorBoardProfileImageUrl(profileImage)
          : buildUserProfileImageUrl(user.profileImage),
      },
    }
  }
}
