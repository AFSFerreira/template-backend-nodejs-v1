import type {
  CreateDirectorBoardUseCaseRequest,
  CreateDirectorBoardUseCaseResponse,
} from '@custom-types/use-cases/director-board/create-director-board'
import type { DatabaseContext } from '@lib/prisma/helpers/database-context'
import type { Prisma } from '@prisma/client'
import type { DirectorPositionsRepository } from '@repositories/director-positions-repository'
import type { DirectorBoardRepository } from '@repositories/directors-board-repository'
import type { UsersRepository } from '@repositories/users-repository'
import type { JSONContent } from '@tiptap/core'
import { MANAGER_PERMISSIONS } from '@constants/sets'
import { logError } from '@lib/logger/helpers/log-error'
import { tiptapConfiguration } from '@lib/tiptap/helpers/configuration'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import { DIRECTOR_BOARD_CREATION_ERROR } from '@messages/loggings/director-board-loggings'
import {
  buildDirectorBoardProfileImagePath,
  buildDirectorBoardTempProfileImagePath,
} from '@services/builders/paths/build-director-board-profile-image-path'
import { buildDirectorBoardProfileImageUrl } from '@services/builders/urls/build-director-board-profile-image-url'
import { buildUserProfileImageUrl } from '@services/builders/urls/build-user-profile-image-url'
import { moveFile } from '@services/files/move-file'
import { generateText } from '@tiptap/core'
import { DirectorBoardImageStorageError } from '@use-cases/errors/director-board/director-board-image-storage-error'
import { DirectorBoardPositionAlreadyOccupiedError } from '@use-cases/errors/director-board/director-board-position-already-occupied-error'
import { DirectorBoardUserAlreadyExistsError } from '@use-cases/errors/director-board/director-board-user-already-exists-error'
import { DirectorBoardUserRoleForbiddenError } from '@use-cases/errors/director-board/director-board-user-role-forbidden-error'
import { DirectorPositionNotFoundError } from '@use-cases/errors/director-position/director-position-not-found-error'
import { InvalidProseMirrorError } from '@use-cases/errors/generic/invalid-prose-mirror-error'
import { UserNotFoundError } from '@use-cases/errors/user/user-not-found-error'
import { deleteFile } from '@utils/files/delete-file'
import { ensureExists, ensureNotExists } from '@utils/validators/ensure'
import { inject, injectable } from 'tsyringe'

@injectable()
export class CreateDirectorBoardUseCase {
  constructor(
    @inject(tokens.repositories.directorsBoard)
    private readonly directorBoardRepository: DirectorBoardRepository,

    @inject(tokens.repositories.users)
    private readonly usersRepository: UsersRepository,

    @inject(tokens.repositories.directorPositions)
    private readonly directorPositionsRepository: DirectorPositionsRepository,

    @inject(tokens.infra.database)
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

    try {
      const { directorBoard, user } = await this.dbContext.runInTransaction(async () => {
        const user = ensureExists({
          value: await this.usersRepository.findByPublicId(userId),
          error: new UserNotFoundError(),
        })

        if (!MANAGER_PERMISSIONS.has(user.role)) {
          throw new DirectorBoardUserRoleForbiddenError()
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

        if (profileImage) {
          ensureExists({
            value: await moveFile({
              oldFilePath: buildDirectorBoardTempProfileImagePath(profileImage),
              newFilePath: buildDirectorBoardProfileImagePath(profileImage),
            }),
            error: new DirectorBoardImageStorageError(),
          })
        }

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

      return {
        directorBoard: {
          ...directorBoard,
          profileImage: profileImage
            ? buildDirectorBoardProfileImageUrl(profileImage)
            : buildUserProfileImageUrl(user.profileImage),
        },
      }
    } catch (error) {
      logError({ error, message: DIRECTOR_BOARD_CREATION_ERROR })

      if (profileImage) {
        // Remover a imagem incorretamente persistida em caso de erro:
        await deleteFile(buildDirectorBoardProfileImagePath(profileImage))
      }

      throw error
    }
  }
}
