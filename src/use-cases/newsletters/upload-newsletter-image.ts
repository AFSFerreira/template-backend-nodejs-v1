import type {
  UploadNewsletterImageUseCaseRequest,
  UploadNewsletterImageUseCaseResponse,
} from '@custom-types/use-cases/newsletters/upload-newsletter-image'
import { NEWSLETTER_TEMP_IMAGES_PATH } from '@constants/dynamic-file-constants'
import { logger } from '@lib/pino'
import { NEWSLETTER_IMAGE_UPLOADED_SUCCESSFULLY } from '@messages/loggings/models/newsletter-loggings'
import { NewsletterUrlBuilderService } from '@services/builders/urls/build-newsletter-image-url'
import { FileService } from '@services/files/file-service'
import { ImageTooBigError } from '@use-cases/errors/generic/image-too-big-error'
import { MissingMultipartContentFile } from '@use-cases/errors/generic/missing-multipart-content-file'
import { inject, singleton } from 'tsyringe'

@singleton()
export class UploadNewsletterImageUseCase {
  constructor(
    @inject(FileService)
    private readonly fileService: FileService,

    @inject(NewsletterUrlBuilderService)
    private readonly newsletterUrlBuilderService: NewsletterUrlBuilderService,
  ) {}

  async execute({ filePart }: UploadNewsletterImageUseCaseRequest): Promise<UploadNewsletterImageUseCaseResponse> {
    if (!filePart) {
      throw new MissingMultipartContentFile()
    }

    if (filePart.file.truncated) {
      throw new ImageTooBigError()
    }

    const { filename, success } = await this.fileService.saveAvifImage({
      filePart: filePart,
      folderPath: NEWSLETTER_TEMP_IMAGES_PATH,
      options: {
        specs: {
          chromaSubsampling: '4:2:0',
        },
      },
    })

    if (!success || filePart.file.truncated) {
      throw new ImageTooBigError()
    }

    logger.info(
      {
        filename,
      },
      NEWSLETTER_IMAGE_UPLOADED_SUCCESSFULLY,
    )

    return {
      filename,
      publicUrl: this.newsletterUrlBuilderService.buildTempImageUrl(filename),
    }
  }
}
