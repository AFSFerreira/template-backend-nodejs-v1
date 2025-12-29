import type {
  DeleteBlogImageUseCaseRequest,
  DeleteBlogImageUseCaseResponse,
} from '@custom-types/use-cases/blogs/delete-blog-image'
import { logger } from '@lib/logger'
import { BLOG_IMAGE_DELETED_SUCCESSFULLY } from '@messages/loggings/blog-loggings'
import { buildBlogTempImagePath } from '@services/builders/build-blog-image-path'
import { deleteFile } from '@utils/files/delete-file'
import { injectable } from 'tsyringe'

@injectable()
export class DeleteBlogImageUseCase {
  async execute({ filename }: DeleteBlogImageUseCaseRequest): Promise<DeleteBlogImageUseCaseResponse> {
    const imagePath = buildBlogTempImagePath(filename)

    await deleteFile(imagePath)

    logger.info(
      {
        filename,
        imagePath,
      },
      BLOG_IMAGE_DELETED_SUCCESSFULLY,
    )

    return {}
  }
}
