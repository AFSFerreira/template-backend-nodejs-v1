import type {
  UpdateProfileImageUseCaseRequest,
  UpdateProfileImageUseCaseResponse,
} from '@custom-types/use-cases/user/update-profile-image'
import type { DatabaseContext } from '@lib/prisma/helpers/database-context'
import type { UsersRepository } from '@repositories/users-repository'
import { REGISTER_PROFILE_IMAGES_PATH } from '@constants/dynamic-file-constants'
import { DEFAULT_PROFILE_IMAGE_NAME } from '@constants/static-file-constants'
import { logger } from '@lib/logger'
import { logError } from '@lib/logger/helpers/log-error'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import { PROFILE_IMAGE_UPDATED_SUCCESSFULLY, UPDATE_USER_IMAGE_ERROR } from '@messages/loggings/user-loggings'
import { buildUserProfileImagePath } from '@services/builders/paths/build-user-profile-image-path'
import { saveCompressedImage } from '@services/files/save-compressed-image'
import { ImageTooBigError } from '@use-cases/errors/generic/image-too-big-error'
import { MissingMultipartContentFile } from '@use-cases/errors/generic/missing-multipart-content-file'
import { ProfileImageUpdateError } from '@use-cases/errors/user/profile-image-update-error'
import { UserNotFoundError } from '@use-cases/errors/user/user-not-found-error'
import { deleteFile } from '@utils/files/delete-file'
import { ensureExists } from '@utils/validators/ensure'
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

    const { finalImagePath, filename, success } = await saveCompressedImage({
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

        await this.usersRepository.updateProfileImage({ id: user.id, profileImage: filename })

        // Remove a imagem antiga se não for a imagem padrão
        if (user.profileImage !== DEFAULT_PROFILE_IMAGE_NAME) {
          const oldImagePath = buildUserProfileImagePath(user.profileImage)
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
        newImage: filename,
      },
      PROFILE_IMAGE_UPDATED_SUCCESSFULLY,
    )

    return { filename }
  }
}
