import type {
  UpdateProfileImageUseCaseRequest,
  UpdateProfileImageUseCaseResponse,
} from '@custom-types/use-cases/user/update-profile-image'
import type { DatabaseContext } from '@lib/prisma/helpers/database-context'
import type { UsersRepository } from '@repositories/users-repository'
import path from 'node:path'
import { REGISTER_PROFILE_IMAGES_PATH } from '@constants/dynamic-file-constants'
import { DEFAULT_PROFILE_IMAGE_NAME } from '@constants/static-file-constants'
import { logger } from '@lib/logger'
import { logError } from '@lib/logger/helpers/log-error'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import { PROFILE_IMAGE_UPDATED_SUCCESSFULLY, UPDATE_USER_IMAGE_ERROR } from '@messages/loggings/user-loggings'
import { saveCompressedImage } from '@services/files/save-compressed-image'
import { MissingMultipartContentFile } from '@use-cases/errors/document-management/missing-multipart-content-file'
import { ImageTooBigError } from '@use-cases/errors/user/image-too-big-error'
import { ProfileImageUpdateError } from '@use-cases/errors/user/profile-image-update-error'
import { UserNotFoundError } from '@use-cases/errors/user/user-not-found-error'
import { deleteFile } from '@utils/files/delete-file'
import { ensureExists } from '@utils/guards/ensure'
import { inject, injectable } from 'tsyringe'

@injectable()
export class UpdateProfileImageUseCase {
  constructor(
    @inject(tokens.repositories.users)
    private readonly usersRepository: UsersRepository,

    @inject(tokens.infra.database)
    private readonly dbContext: DatabaseContext,
  ) {}

  async execute({
    userPublicId,
    filePart,
  }: UpdateProfileImageUseCaseRequest): Promise<UpdateProfileImageUseCaseResponse> {
    if (!filePart) {
      throw new MissingMultipartContentFile()
    }

    // Verificação preventiva:
    if (filePart.file.truncated) {
      throw new ImageTooBigError()
    }

    const { finalImagePath, fileName, success } = await saveCompressedImage({
      imageStream: filePart.file,
      folderPath: REGISTER_PROFILE_IMAGES_PATH,
    })

    // Deleta a imagem se ela estourar o buffer:
    if (!success || filePart.file.truncated) {
      throw new ImageTooBigError()
    }

    try {
      await this.dbContext.runInTransaction(async () => {
        const user = ensureExists({
          value: await this.usersRepository.findByPublicId(userPublicId),
          error: new UserNotFoundError(),
        })

        await this.usersRepository.updateProfileImage({ id: user.id, profileImage: fileName })

        // Remove a imagem antiga se não for a imagem padrão
        if (user.profileImage !== DEFAULT_PROFILE_IMAGE_NAME) {
          const oldImagePath = path.join(REGISTER_PROFILE_IMAGES_PATH, user.profileImage)
          await deleteFile(oldImagePath)
        }
      })
    } catch (error) {
      // Remove a imagem persistida em caso de erro:
      logError({ error, message: UPDATE_USER_IMAGE_ERROR })

      await deleteFile(finalImagePath)

      throw new ProfileImageUpdateError()
    }

    logger.info(
      {
        newImage: fileName,
      },
      PROFILE_IMAGE_UPDATED_SUCCESSFULLY,
    )

    return { fileName }
  }
}
