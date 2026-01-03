import type {
  UploadInstitutionalAboutImageUseCaseRequest,
  UploadInstitutionalAboutImageUseCaseResponse,
} from '@custom-types/use-cases/institutional-info/upload-institutional-about-image'
import { INSTITUTIONAL_TEMP_ABOUT_IMAGES_PATH } from '@constants/dynamic-file-constants'
import { buildTempInstitutionalAboutImageUrl } from '@services/builders/urls/build-institutional-about-image-url'
import { saveAvifImage } from '@services/files/save-avif-image'
import { ImageTooBigError } from '@use-cases/errors/generic/image-too-big-error'
import { MissingMultipartContentFile } from '@use-cases/errors/generic/missing-multipart-content-file'
import { injectable } from 'tsyringe'

@injectable()
export class UploadInstitutionalAboutImageUseCase {
  async execute({
    filePart,
  }: UploadInstitutionalAboutImageUseCaseRequest): Promise<UploadInstitutionalAboutImageUseCaseResponse> {
    if (!filePart) {
      throw new MissingMultipartContentFile()
    }

    if (filePart.file.truncated) {
      throw new ImageTooBigError()
    }

    const { filename, success } = await saveAvifImage({
      filePart,
      folderPath: INSTITUTIONAL_TEMP_ABOUT_IMAGES_PATH,
    })

    if (!success || filePart.file.truncated) {
      throw new ImageTooBigError()
    }

    const publicUrl = buildTempInstitutionalAboutImageUrl(filename)

    return { filename, publicUrl }
  }
}
