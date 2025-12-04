import path from 'node:path'

import { MAX_IMAGE_FILE_SIZE_BYTES, REGISTER_TEMP_PROFILE_IMAGES_PATH } from '@constants/file-constants'
import type {
  UploadRegisterProfileImageUseCaseRequest,
  UploadRegisterProfileImageUseCaseResponse,
} from '@custom-types/use-cases/user/upload-register-profile-image'
import { saveCompressedImage } from '@services/save-compressed-image'
import { ImageTooBigError } from '@use-cases/errors/user/image-too-big-error'
import { UserImageStorageError } from '@use-cases/errors/user/user-image-storage-error'

export class UploadRegisterProfileImageUseCase {
  async execute({
    buffer,
    sizeInBytes,
  }: UploadRegisterProfileImageUseCaseRequest): Promise<UploadRegisterProfileImageUseCaseResponse> {
    if (sizeInBytes > MAX_IMAGE_FILE_SIZE_BYTES) {
      throw new ImageTooBigError()
    }

    try {
      const { finalImagePath } = await saveCompressedImage({
        imageBuffer: buffer,
        folderPath: REGISTER_TEMP_PROFILE_IMAGES_PATH,
      })

      return { fileName: path.basename(finalImagePath) }
    } catch (_error: unknown) {
      throw new UserImageStorageError()
    }
  }
}
