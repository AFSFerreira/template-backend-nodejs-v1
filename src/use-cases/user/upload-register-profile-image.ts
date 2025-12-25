import type {
  UploadRegisterProfileImageUseCaseRequest,
  UploadRegisterProfileImageUseCaseResponse,
} from '@custom-types/use-cases/user/upload-register-profile-image'
import { REGISTER_TEMP_PROFILE_IMAGES_PATH } from '@constants/dynamic-file-constants'
import { saveCompressedImage } from '@services/files/save-compressed-image'
import { ImageTooBigError } from '@use-cases/errors/generic/image-too-big-error'
import { MissingMultipartContentFile } from '@use-cases/errors/generic/missing-multipart-content-file'
import { injectable } from 'tsyringe'

@injectable()
export class UploadRegisterProfileImageUseCase {
  async execute({
    filePart,
  }: UploadRegisterProfileImageUseCaseRequest): Promise<UploadRegisterProfileImageUseCaseResponse> {
    if (!filePart) {
      throw new MissingMultipartContentFile()
    }

    // Verificação preventiva:
    if (filePart.file.truncated) {
      throw new ImageTooBigError()
    }

    const { filename, success } = await saveCompressedImage({
      imageStream: filePart.file,
      folderPath: REGISTER_TEMP_PROFILE_IMAGES_PATH,
    })

    if (!success || filePart.file.truncated) {
      throw new ImageTooBigError()
    }

    return { filename }
  }
}
