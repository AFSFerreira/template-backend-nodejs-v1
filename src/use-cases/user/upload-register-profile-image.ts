import type {
  UploadUserProfileImageUseCaseRequest,
  UploadUserProfileImageUseCaseResponse,
} from '@custom-types/use-cases/user/upload-register-profile-image'
import { REGISTER_TEMP_PROFILE_IMAGES_PATH } from '@constants/dynamic-file-constants'
import { FileService } from '@services/files/file-service'
import { ImageTooBigError } from '@use-cases/errors/generic/image-too-big-error'
import { MissingMultipartContentFile } from '@use-cases/errors/generic/missing-multipart-content-file'
import { inject, singleton } from 'tsyringe'

@singleton()
export class UploadUserProfileImageUseCase {
  constructor(
    @inject(FileService)
    private readonly fileService: FileService,
  ) {}

  async execute({ filePart }: UploadUserProfileImageUseCaseRequest): Promise<UploadUserProfileImageUseCaseResponse> {
    if (!filePart) {
      throw new MissingMultipartContentFile()
    }

    // Verificação preventiva:
    if (filePart.file.truncated) {
      throw new ImageTooBigError()
    }

    const { filename, success } = await this.fileService.saveCompressedImage({
      filePart,
      folderPath: REGISTER_TEMP_PROFILE_IMAGES_PATH,
    })

    if (!success || filePart.file.truncated) {
      throw new ImageTooBigError()
    }

    return { filename }
  }
}
