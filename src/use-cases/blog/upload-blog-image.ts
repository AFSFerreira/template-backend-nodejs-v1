import type {
  UploadBlogImageUseCaseRequest,
  UploadBlogImageUseCaseResponse,
} from '@custom-types/use-cases/blogs/upload-blog-image'
import { BLOG_TEMP_IMAGES_PATH } from '@constants/dynamic-file-constants'
import { logger } from '@lib/pino'
import { BLOG_IMAGE_UPLOADED_SUCCESSFULLY } from '@messages/loggings/models/blog-loggings'
import { FileService } from '@services/files/file-service'
import { ImageTooBigError } from '@use-cases/errors/generic/image-too-big-error'
import { MissingMultipartContentFile } from '@use-cases/errors/generic/missing-multipart-content-file'
import { inject, injectable } from 'tsyringe'

@injectable()
export class UploadBlogImageUseCase {
  constructor(
    @inject(FileService)
    private readonly fileService: FileService,
  ) {}

  async execute({ filePart }: UploadBlogImageUseCaseRequest): Promise<UploadBlogImageUseCaseResponse> {
    if (!filePart) {
      throw new MissingMultipartContentFile()
    }

    if (filePart.file.truncated) {
      throw new ImageTooBigError()
    }

    const { filename, success } = await this.fileService.saveAvifImage({
      filePart: filePart,
      folderPath: BLOG_TEMP_IMAGES_PATH,
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
      BLOG_IMAGE_UPLOADED_SUCCESSFULLY,
    )

    return { filename }
  }
}
