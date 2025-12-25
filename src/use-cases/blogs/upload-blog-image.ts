import type {
  UploadBlogImageUseCaseRequest,
  UploadBlogImageUseCaseResponse,
} from '@custom-types/use-cases/blogs/upload-blog-image'
import { BLOG_TEMP_IMAGES_PATH } from '@constants/dynamic-file-constants'
import { logger } from '@lib/logger'
import { BLOG_IMAGE_UPLOADED_SUCCESSFULLY } from '@messages/loggings/blog-loggings'
import { saveImage } from '@services/files/save-image'
import { ImageTooBigError } from '@use-cases/errors/generic/image-too-big-error'
import { MissingMultipartContentFile } from '@use-cases/errors/generic/missing-multipart-content-file'
import { injectable } from 'tsyringe'

@injectable()
export class UploadBlogImageUseCase {
  async execute({
    originalFilename,
    filePart,
  }: UploadBlogImageUseCaseRequest): Promise<UploadBlogImageUseCaseResponse> {
    if (!filePart) {
      throw new MissingMultipartContentFile()
    }

    if (filePart.file.truncated) {
      throw new ImageTooBigError()
    }

    const { filename, success } = await saveImage({
      originalFilename,
      imageStream: filePart.file,
      folderPath: BLOG_TEMP_IMAGES_PATH,
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
