import path from 'path'
import { REGISTER_TEMP_PROFILE_IMAGES_PATH } from '@constants/file-paths'
import { MAX_IMAGE_FILE_SIZE_BYTES } from '@constants/file-sizes'
import { ImageTooBigError } from '@use-cases/errors/user/image-too-big-error'
import { UserImageStorageError } from '@use-cases/errors/user/user-image-storage-error'
import { saveCompressedImage } from '@utils/save-compressed-image'

interface UploadRegisterProfileImageUseCaseRequest {
  buffer: Buffer
  size: number
}

interface UploadRegisterProfileImageUseCaseResponse {
  fileName: string
}

export class UploadRegisterProfileImageUseCase {
  async execute({
    buffer,
    size,
  }: UploadRegisterProfileImageUseCaseRequest): Promise<UploadRegisterProfileImageUseCaseResponse> {
    if (size > MAX_IMAGE_FILE_SIZE_BYTES) {
      throw new ImageTooBigError()
    }

    try {
      const { finalImagePath } = await saveCompressedImage(
        buffer,
        REGISTER_TEMP_PROFILE_IMAGES_PATH,
      )

      return { fileName: path.basename(finalImagePath) }
    } catch (error) {
      throw new UserImageStorageError()
    }
  }
}
