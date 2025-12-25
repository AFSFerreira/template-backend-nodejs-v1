import type {
  UploadSliderImageUseCaseRequest,
  UploadSliderImageUseCaseResponse,
} from '@custom-types/use-cases/slider-image/upload-slider-image'
import { TEMP_SLIDER_IMAGES_PATH } from '@constants/dynamic-file-constants'
import { saveSliderImage } from '@services/files/save-slider-image'
import { ImageTooBigError } from '@use-cases/errors/generic/image-too-big-error'
import { MissingMultipartContentFile } from '@use-cases/errors/generic/missing-multipart-content-file'
import { injectable } from 'tsyringe'

@injectable()
export class UploadSliderImageUseCase {
  async execute({ filePart }: UploadSliderImageUseCaseRequest): Promise<UploadSliderImageUseCaseResponse> {
    if (!filePart) {
      throw new MissingMultipartContentFile()
    }

    // Verificação preventiva:
    if (filePart.file.truncated) {
      throw new ImageTooBigError()
    }

    const { filename, success } = await saveSliderImage({
      imageStream: filePart.file,
      folderPath: TEMP_SLIDER_IMAGES_PATH,
      options: {
        aspectRatio: '21:9',
        quality: 'FULL_HD',
      },
    })

    if (!success || filePart.file.truncated) {
      throw new ImageTooBigError()
    }

    return { filename }
  }
}
