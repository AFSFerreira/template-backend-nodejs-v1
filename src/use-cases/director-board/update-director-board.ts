import type { UpdateDirectorBoardQuery } from '@custom-types/repository/prisma/director-board/update-director-board-query'
import type {
  UpdateDirectorBoardUseCaseRequest,
  UpdateDirectorBoardUseCaseResponse,
} from '@custom-types/use-cases/director-board/update-director-board'
import type { Prisma } from '@prisma/generated/client'
import type { DirectorPositionsRepository } from '@repositories/director-positions-repository'
import type { DirectorBoardRepository } from '@repositories/directors-board-repository'
import type { UsersRepository } from '@repositories/users-repository'
import type { JSONContent } from '@tiptap/core'
import { moveFileEnqueued } from '@jobs/queues/facades/file-queue-facade'
import { tiptapConfiguration } from '@lib/tiptap/helpers/configuration'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { UserRoleType } from '@prisma/generated/enums'
import { DirectorBoardHtmlCacheService } from '@services/caches/director-board-html-cache'
import { generateText } from '@tiptap/core'
import { DirectorBoardNotFoundError } from '@use-cases/errors/director-board/director-board-not-found-error'
import { DirectorBoardPositionAlreadyOccupiedError } from '@use-cases/errors/director-board/director-board-position-already-occupied-error'
import { ManagerCannotUpdateOtherDirectorBoardError } from '@use-cases/errors/director-board/manager-cannot-update-other-director-board-error'
import { OnlyAdminCanChangeDirectorBoardPositionError } from '@use-cases/errors/director-board/only-admin-can-change-director-board-position-error'
import { DirectorPositionNotFoundError } from '@use-cases/errors/director-position/director-position-not-found-error'
import { InvalidProseMirrorError } from '@use-cases/errors/generic/invalid-prose-mirror-error'
import { UserNotFoundError } from '@use-cases/errors/user/user-not-found-error'
import {
  buildDirectorBoardProfileImagePath,
  buildDirectorBoardTempProfileImagePath,
} from '@utils/builders/paths/build-director-board-profile-image-path'
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

    @inject(DirectorBoardHtmlCacheService)
    private readonly directorBoardHtmlCacheService: DirectorBoardHtmlCacheService,
  ) {}

  async execute({
    publicId,
    data,
    requestUserPublicId,
  }: UpdateDirectorBoardUseCaseRequest): Promise<UpdateDirectorBoardUseCaseResponse> {
    const updateData: UpdateDirectorBoardQuery['data'] = {}

    let newProfileImage: string | undefined

    const currentDirectorBoard = ensureExists({
      value: await this.directorBoardRepository.findByPublicId(publicId),
      error: new DirectorBoardNotFoundError(),
    })

    const requestUser = ensureExists({
      value: await this.usersRepository.findByPublicId(requestUserPublicId),
      error: new UserNotFoundError(),
    })

    const requestUserIsManager = requestUser.role === UserRoleType.MANAGER

    // NOTE: Manager só pode atualizar seu próprio perfil
    if (requestUserIsManager && currentDirectorBoard.User.publicId !== requestUser.publicId) {
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

    updateData.directorPositionId = currentDirectorBoard.DirectorPosition.id

    if (data.positionId) {
      if (requestUserIsManager) {
        throw new OnlyAdminCanChangeDirectorBoardPositionError()
      }

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

    const directorBoard = shouldUpdate
      ? await this.directorBoardRepository.update({
          id: currentDirectorBoard.id,
          data: updateData,
        })
      : currentDirectorBoard

    const directorBoardProfileImagePaths = newProfileImage
      ? {
          oldFilePath: buildDirectorBoardTempProfileImagePath(newProfileImage),
          newFilePath: buildDirectorBoardProfileImagePath(newProfileImage),
        }
      : undefined

    if (directorBoardProfileImagePaths) {
      await moveFileEnqueued(directorBoardProfileImagePaths)
    }

    // Removendo o cache HTML do director board:
    await this.directorBoardHtmlCacheService.remove(directorBoard.publicId)

    return {
      directorBoard,
    }
  }
}
