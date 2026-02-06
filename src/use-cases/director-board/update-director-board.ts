import type {
  UpdateDirectorBoardUseCaseRequest,
  UpdateDirectorBoardUseCaseResponse,
} from '@custom-types/use-cases/director-board/update-director-board'
import type { DatabaseContext } from '@lib/prisma/helpers/database-context'
import { tiptapConfiguration } from '@lib/tiptap/helpers/configuration'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import type { Prisma } from '@prisma/generated/client'
import type { DirectorPositionsRepository } from '@repositories/director-positions-repository'
import type { DirectorBoardRepository } from '@repositories/directors-board-repository'
import {
  buildDirectorBoardProfileImagePath,
  buildDirectorBoardTempProfileImagePath,
} from '@services/builders/paths/build-director-board-profile-image-path'
import { buildDirectorBoardProfileImageUrl } from '@services/builders/urls/build-director-board-profile-image-url'
import { buildUserProfileImageUrl } from '@services/builders/urls/build-user-profile-image-url'
import { moveFile } from '@services/files/move-file'
import type { JSONContent } from '@tiptap/core'
import { generateText } from '@tiptap/core'
import { DirectorBoardImageStorageError } from '@use-cases/errors/director-board/director-board-image-storage-error'
import { DirectorBoardNotFoundError } from '@use-cases/errors/director-board/director-board-not-found-error'
import { DirectorBoardPositionAlreadyOccupiedError } from '@use-cases/errors/director-board/director-board-position-already-occupied-error'
import { DirectorPositionNotFoundError } from '@use-cases/errors/director-position/director-position-not-found-error'
import { InvalidProseMirrorError } from '@use-cases/errors/generic/invalid-prose-mirror-error'
import { sanitizeUrlFilename } from '@utils/formatters/sanitize-url-filename'
import { ensureExists } from '@utils/validators/ensure'
import { inject, injectable } from 'tsyringe'

@injectable()
export class UpdateDirectorBoardUseCase {
  constructor(
    @inject(tsyringeTokens.repositories.directorsBoard)
    private readonly directorBoardRepository: DirectorBoardRepository,

    @inject(tsyringeTokens.repositories.directorPositions)
    private readonly directorPositionsRepository: DirectorPositionsRepository,

    @inject(tsyringeTokens.infra.database)
    private readonly dbContext: DatabaseContext,
  ) {}

  async execute({ publicId, data }: UpdateDirectorBoardUseCaseRequest): Promise<UpdateDirectorBoardUseCaseResponse> {
    let profileImage: string | null | undefined
    const profileImageSanitized = sanitizeUrlFilename(data.profileImage)

    const updateData: Prisma.DirectorBoardUpdateInput & {
      directorPositionId?: number
    } = {}

    try {
      const { directorBoard } = await this.dbContext.runInTransaction(async () => {
        const currentDirectorBoard = ensureExists({
          value: await this.directorBoardRepository.findByPublicId(publicId),
          error: new DirectorBoardNotFoundError(),
        })

        profileImage = currentDirectorBoard.profileImage

        if (data.profileImage && profileImageSanitized && profileImageSanitized !== currentDirectorBoard.profileImage) {
          ensureExists({
            value: profileImageSanitized,
            error: new DirectorBoardImageStorageError(),
          })

          ensureExists({
            value: await moveFile({
              oldFilePath: buildDirectorBoardTempProfileImagePath(profileImageSanitized),
              newFilePath: buildDirectorBoardProfileImagePath(profileImageSanitized),
            }),
            error: new DirectorBoardImageStorageError(),
          })

          updateData.profileImage = profileImageSanitized
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

        return { directorBoard: updatedDirectorBoard }
      })

      return {
        directorBoard: {
          ...directorBoard,
          profileImage: directorBoard.profileImage
            ? buildDirectorBoardProfileImageUrl(directorBoard.profileImage)
            : buildUserProfileImageUrl(directorBoard.User.profileImage),
        },
      }
    } catch (error) {
      // Restaurando a imagem incorretamente persistida:
      if (data.profileImage && profileImageSanitized && profileImageSanitized !== profileImage) {
        await moveFile({
          oldFilePath: buildDirectorBoardProfileImagePath(profileImageSanitized),
          newFilePath: buildDirectorBoardTempProfileImagePath(profileImageSanitized),
        })
      }

      throw error
    }
  }
}
