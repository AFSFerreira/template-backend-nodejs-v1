import type {
  UploadSliderImageUseCaseRequest,
  UploadSliderImageUseCaseResponse,
} from '@custom-types/use-cases/slider-image/upload-slider-image'
import { SLIDER_TEMP_IMAGES_PATH } from '@constants/dynamic-file-constants'
import { FileService } from '@services/files/file-service'
import { ImageTooBigError } from '@use-cases/errors/generic/image-too-big-error'
import { MissingMultipartContentFile } from '@use-cases/errors/generic/missing-multipart-content-file'
import { inject, injectable } from 'tsyringe'

@injectable()
export class UploadSliderImageUseCase {
  constructor(
    @inject(FileService)
    private readonly fileService: FileService,
  ) {}

  async execute({ filePart }: UploadSliderImageUseCaseRequest): Promise<UploadSliderImageUseCaseResponse> {
    if (!filePart) {
      throw new MissingMultipartContentFile()
    }

    // Verificação preventiva:
    if (filePart.file.truncated) {
      throw new ImageTooBigError()
    }

    const { filename, success } = await this.fileService.saveAvifImage({
      filePart: filePart,
      folderPath: SLIDER_TEMP_IMAGES_PATH,
      options: {
        dimensions: {
          aspectRatio: '21:9',
          quality: 'FULL_HD',
        },
        specs: {
          chromaSubsampling: '4:4:4',
        },
      },
    })

    if (!success || filePart.file.truncated) {
      throw new ImageTooBigError()
    }

    return { filename }
  }
}
