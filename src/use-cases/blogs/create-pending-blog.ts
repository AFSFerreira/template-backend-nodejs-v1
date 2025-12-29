import type {
  CreatePendingBlogUseCaseRequest,
  CreatePendingBlogUseCaseResponse,
} from '@custom-types/use-cases/blogs/create-blog'
import type { DatabaseContext } from '@lib/prisma/helpers/database-context'
import type { InputJsonValue } from '@prisma/client/runtime/client'
import type { ActivityAreasRepository } from '@repositories/activity-areas-repository'
import type { BlogsRepository } from '@repositories/blogs-repository'
import type { UsersRepository } from '@repositories/users-repository'
import { logger } from '@lib/logger'
import { logError } from '@lib/logger/helpers/log-error'
import { tiptapConfiguration } from '@lib/tiptap/helpers/configuration'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import { BLOG_CREATED_SUCCESSFULLY, BLOG_IMAGES_PERSIST_ERROR } from '@messages/loggings/blog-loggings'
import { ActivityAreaType, EditorialStatusType } from '@prisma/client'
import { buildBlogBannerPath, buildBlogTempBannerPath } from '@services/builders/build-blog-banner-path'
import { buildBlogImagePath, buildBlogTempImagePath } from '@services/builders/build-blog-image-path'
import { extractProseMirrorImages } from '@services/extractors/extract-prose-mirror-images'
import { getProseMirrorText } from '@services/extractors/get-prose-mirror-text'
import { persistFile } from '@services/files/persist-file'
import { validateActivityAreas } from '@services/validators/validate-activity-areas'
import { BlogImagePersistError } from '@use-cases/errors/blog/blog-image-persist-error'
import { BlogInvalidImageLinkError } from '@use-cases/errors/blog/blog-invalid-image-link-error'
import { InvalidActivityArea } from '@use-cases/errors/user/invalid-activity-areas-error'
import { deleteFile } from '@utils/files/delete-file'
import { sanitizeUrlFilename } from '@utils/formatters/sanitize-url-filename'
import { ensureExists } from '@utils/validators/ensure'
import { inject, injectable } from 'tsyringe'
import { BlogBannerPersistError } from '../errors/blog/blog-banner-persist-error'
import { InvalidBlogContentError } from '../errors/blog/invalid-blog-content-error'
import { UserNotFoundError } from '../errors/user/user-not-found-error'

@injectable()
export class CreatePendingBlogUseCase {
  constructor(
    @inject(tokens.repositories.activityAreas)
    private readonly activityAreasRepository: ActivityAreasRepository,

    @inject(tokens.repositories.blogs)
    private readonly blogsRepository: BlogsRepository,

    @inject(tokens.repositories.users)
    private readonly usersRepository: UsersRepository,

    @inject(tokens.infra.database)
    private readonly dbContext: DatabaseContext,
  ) {}

  async execute(
    createPendingBlogUseCaseInput: CreatePendingBlogUseCaseRequest,
  ): Promise<CreatePendingBlogUseCaseResponse> {
    const searchContent = getProseMirrorText({
      proseMirror: createPendingBlogUseCaseInput.content,
      tiptapConfiguration,
    })

    if (!searchContent) {
      throw new InvalidBlogContentError()
    }

    // Persistindo banner e imagens da pasta temporária para a pasta definitiva:
    const persistedBanner = await persistFile({
      oldFilePath: buildBlogTempBannerPath(createPendingBlogUseCaseInput.bannerImage),
      newFilePath: buildBlogBannerPath(createPendingBlogUseCaseInput.bannerImage),
    })

    if (!persistedBanner) {
      throw new BlogBannerPersistError()
    }

    const newBlogImages = extractProseMirrorImages(createPendingBlogUseCaseInput.content)

    try {
      // Persistindo as novas imagens do blog:
      await Promise.all(
        Array.from(newBlogImages).map(async (image) => {
          const imageName = sanitizeUrlFilename(image)

          if (!imageName) {
            throw new BlogInvalidImageLinkError()
          }

          const oldFilePath = buildBlogTempImagePath(imageName)
          const newFilePath = buildBlogImagePath(imageName)

          const imagePersistResult = await persistFile({
            oldFilePath,
            newFilePath,
          })

          if (!imagePersistResult) {
            throw new BlogImagePersistError()
          }
        }),
      )
    } catch (error) {
      logError({ error, message: BLOG_IMAGES_PERSIST_ERROR })

      newBlogImages.forEach(async (image) => {
        const filenameFromUrl = sanitizeUrlFilename(image)

        if (!filenameFromUrl) return

        await deleteFile(buildBlogImagePath(filenameFromUrl))
      })
    }

    const { author, blog } = await this.dbContext.runInTransaction(async () => {
      const author = ensureExists({
        value: await this.usersRepository.findByPublicId(createPendingBlogUseCaseInput.authorPublicId),
        error: new UserNotFoundError(),
      })

      const { validatedActivityAreas, success } = await validateActivityAreas({
        activityAreasRepository: this.activityAreasRepository,
        activityAreas: createPendingBlogUseCaseInput.subcategories.map((subcategory) => ({
          area: subcategory,
          type: ActivityAreaType.SUB_AREA_OF_ACTIVITY,
        })),
      })

      if (!success) {
        throw new InvalidActivityArea(
          validatedActivityAreas.map((activityArea) => JSON.stringify(activityArea, null, 2)).toString(),
        )
      }

      const subcategoriesIds = validatedActivityAreas.map((subcategory) => subcategory.id)

      const createdBlog = await this.blogsRepository.create({
        editorialStatus: EditorialStatusType.PENDING_APPROVAL,
        title: createPendingBlogUseCaseInput.title,
        bannerImage: createPendingBlogUseCaseInput.bannerImage,
        searchContent,
        subcategoriesIds,
        content: createPendingBlogUseCaseInput.content as InputJsonValue,
        authorName: author.fullName,
        userId: author.id,
      })

      return { author, blog: createdBlog }
    })

    logger.info(
      {
        blogPublicId: blog.publicId,
        title: blog.title,
        authorPublicId: author.publicId,
      },
      BLOG_CREATED_SUCCESSFULLY,
    )

    return { blog }
  }
}
