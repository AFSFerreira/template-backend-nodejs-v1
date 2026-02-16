import type {
  UpdateDirectorBoardUseCaseRequest,
  UpdateDirectorBoardUseCaseResponse,
} from '@custom-types/use-cases/director-board/update-director-board'
import type { DatabaseContext } from '@lib/prisma/helpers/database-context'
import type { Prisma } from '@prisma/generated/client'
import type { DirectorPositionsRepository } from '@repositories/director-positions-repository'
import type { DirectorBoardRepository } from '@repositories/directors-board-repository'
import type { UsersRepository } from '@repositories/users-repository'
import type { JSONContent } from '@tiptap/core'
import { moveFileEnqueued } from '@jobs/queues/facades/file-queue-facade'
import { redis } from '@lib/redis'
import { tiptapConfiguration } from '@lib/tiptap/helpers/configuration'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { UserRoleType } from '@prisma/generated/enums'
import {
  buildDirectorBoardProfileImagePath,
  buildDirectorBoardTempProfileImagePath,
} from '@services/builders/paths/build-director-board-profile-image-path'
import { buildDirectorBoardProfileImageUrl } from '@services/builders/urls/build-director-board-profile-image-url'
import { buildUserProfileImageUrl } from '@services/builders/urls/build-user-profile-image-url'
import { removeDirectorBoardHTMLCache } from '@services/cache/director-board-html-cache'
import { generateText } from '@tiptap/core'
import { DirectorBoardNotFoundError } from '@use-cases/errors/director-board/director-board-not-found-error'
import { DirectorBoardPositionAlreadyOccupiedError } from '@use-cases/errors/director-board/director-board-position-already-occupied-error'
import { ManagerCannotUpdateOtherDirectorBoardError } from '@use-cases/errors/director-board/manager-cannot-update-other-director-board-error'
import { DirectorPositionNotFoundError } from '@use-cases/errors/director-position/director-position-not-found-error'
import { InvalidProseMirrorError } from '@use-cases/errors/generic/invalid-prose-mirror-error'
import { UserNotFoundError } from '@use-cases/errors/user/user-not-found-error'
import { sanitizeUrlFilename } from '@utils/formatters/sanitize-url-filename'
import { ensureExists } from '@utils/validators/ensure'
import { inject, injectable } from 'tsyringe'

@injectable()
export class UpdateDirectorBoardUseCase {
  constructor(
    @inject(tsyringeTokens.repositories.users)
    private readonly usersRepository: UsersRepository,

    @inject(tsyringeTokens.repositories.directorsBoard)
    private readonly directorBoardRepository: DirectorBoardRepository,

    @inject(tsyringeTokens.repositories.directorPositions)
    private readonly directorPositionsRepository: DirectorPositionsRepository,

    @inject(tsyringeTokens.infra.database)
    private readonly dbContext: DatabaseContext,
  ) {}

  async execute({
    publicId,
    data,
    requestUserPublicId,
  }: UpdateDirectorBoardUseCaseRequest): Promise<UpdateDirectorBoardUseCaseResponse> {
    const updateData: Prisma.DirectorBoardUpdateInput & {
      directorPositionId?: number
    } = {}

    let newProfileImage: string | undefined

    const { directorBoard } = await this.dbContext.runInTransaction(async () => {
      const currentDirectorBoard = ensureExists({
        value: await this.directorBoardRepository.findByPublicId(publicId),
        error: new DirectorBoardNotFoundError(),
      })

      const requestUser = ensureExists({
        value: await this.usersRepository.findByPublicId(requestUserPublicId),
        error: new UserNotFoundError(),
      })

      // Validação: Manager só pode atualizar seu próprio perfil
      if (requestUser.role === UserRoleType.MANAGER && currentDirectorBoard.User.publicId !== requestUser.publicId) {
        throw new ManagerCannotUpdateOtherDirectorBoardError()
      }

      if (data.profileImage) {
        const profileImageSanitized = sanitizeUrlFilename(data.profileImage)

        newProfileImage =
          profileImageSanitized && profileImageSanitized !== currentDirectorBoard.profileImage
            ? profileImageSanitized
            : undefined

        if (newProfileImage) {
          updateData.profileImage = newProfileImage
        }
      }

      if (data.positionId) {
        const directorPosition = ensureExists({
          value: await this.directorPositionsRepository.findUniqueBy({ publicId: data.positionId }),
          error: new DirectorPositionNotFoundError(),
        })

        const existingDirectorBoard = await this.directorBoardRepository.findByDirectorPositionId(directorPosition.id)

        if (existingDirectorBoard && existingDirectorBoard.id !== currentDirectorBoard.id) {
          throw new DirectorBoardPositionAlreadyOccupiedError()
        }

        updateData.directorPositionId = directorPosition.id
      }

      if (data.aboutMe) {
        try {
          generateText(data.aboutMe as JSONContent, tiptapConfiguration)
        } catch (_error) {
          throw new InvalidProseMirrorError()
        }

        updateData.aboutMe = data.aboutMe as Prisma.InputJsonValue
      }

      if (data.publicName) {
        updateData.publicName = data.publicName
      }

      const shouldUpdate = Object.keys(updateData).length > 0

      const updatedDirectorBoard = shouldUpdate
        ? await this.directorBoardRepository.update({
            id: currentDirectorBoard.id,
            data: updateData,
          })
        : currentDirectorBoard

      return {
        directorBoard: updatedDirectorBoard,
      }
    })

    const directorBoardProfileImagePaths = newProfileImage
      ? {
          oldFilePath: buildDirectorBoardTempProfileImagePath(newProfileImage),
          newFilePath: buildDirectorBoardProfileImagePath(newProfileImage),
        }
      : undefined

    if (directorBoardProfileImagePaths) {
      await moveFileEnqueued(directorBoardProfileImagePaths)
    }

    // Invalidando o cache HTML se o aboutMe foi atualizado:
    if (data.aboutMe) {
      await removeDirectorBoardHTMLCache({ directorBoardId: directorBoard.id, redis })
    }

    return {
      directorBoard: {
        ...directorBoard,
        profileImage: directorBoard.profileImage
          ? buildDirectorBoardProfileImageUrl(directorBoard.profileImage)
          : buildUserProfileImageUrl(directorBoard.User.profileImage),
      },
    }
  }
}
