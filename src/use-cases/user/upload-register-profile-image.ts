import type {
  UploadRegisterProfileImageUseCaseRequest,
  UploadRegisterProfileImageUseCaseResponse,
} from '@custom-types/use-cases/user/upload-register-profile-image'
import path from 'node:path'
import { REGISTER_TEMP_PROFILE_IMAGES_PATH } from '@constants/dynamic-file-constants'
import { saveCompressedImage } from '@services/files/save-compressed-image'
import { MissingMultipartContentFile } from '@use-cases/errors/document-management/missing-multipart-content-file'
import { ImageTooBigError } from '@use-cases/errors/user/image-too-big-error'
import { deleteFile } from '@utils/files/delete-file'
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

    const { finalImagePath, success } = await saveCompressedImage({
      imageStream: filePart.file,
      folderPath: REGISTER_TEMP_PROFILE_IMAGES_PATH,
    })

    // Deleta a imagem se ela estourar o buffer:
    if (!success || filePart.file.truncated) {
      await deleteFile(finalImagePath)
      throw new ImageTooBigError()
    }

    return { fileName: path.basename(finalImagePath) }
  }
}
