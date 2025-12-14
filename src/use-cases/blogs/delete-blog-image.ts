import type {
  DeleteBlogImageUseCaseRequest,
  DeleteBlogImageUseCaseResponse,
} from '@custom-types/use-cases/blogs/delete-blog-image'
import path from 'node:path'
import { BLOG_TEMP_IMAGES_PATH } from '@constants/dynamic-file-constants'
import { logger } from '@lib/logger'
import { BLOG_IMAGE_DELETED_SUCCESSFULLY } from '@messages/loggings/blog-loggings'
import { deleteFile } from '@utils/files/delete-file'
import { injectable } from 'tsyringe'

@injectable()
export class DeleteBlogImageUseCase {
  async execute({ fileName }: DeleteBlogImageUseCaseRequest): Promise<DeleteBlogImageUseCaseResponse> {
    const imagePath = path.resolve(BLOG_TEMP_IMAGES_PATH, fileName)

    await deleteFile(imagePath)

    logger.info(
      {
        fileName,
        imagePath,
      },
      BLOG_IMAGE_DELETED_SUCCESSFULLY,
    )

    return {}
  }
}
