import type {
  UploadBlogBannerUseCaseRequest,
  UploadBlogBannerUseCaseResponse,
} from '@custom-types/use-cases/blogs/upload-blog-banner'
import { BLOG_TEMP_BANNERS_PATH } from '@constants/dynamic-file-constants'
import { logger } from '@lib/pino'
import { BLOG_BANNER_UPLOADED_SUCCESSFULLY } from '@messages/loggings/models/blog-loggings'
import { saveAvifImage } from '@services/files/save-avif-image'
import { ImageTooBigError } from '@use-cases/errors/generic/image-too-big-error'
import { MissingMultipartContentFile } from '@use-cases/errors/generic/missing-multipart-content-file'
import { injectable } from 'tsyringe'

@injectable()
export class UploadBlogBannerUseCase {
  async execute({ filePart }: UploadBlogBannerUseCaseRequest): Promise<UploadBlogBannerUseCaseResponse> {
    if (!filePart) {
      throw new MissingMultipartContentFile()
    }

    if (filePart.file.truncated) {
      throw new ImageTooBigError()
    }

    const { filename, success } = await saveAvifImage({
      filePart: filePart,
      folderPath: BLOG_TEMP_BANNERS_PATH,
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
      BLOG_BANNER_UPLOADED_SUCCESSFULLY,
    )

    return { filename }
  }
}
