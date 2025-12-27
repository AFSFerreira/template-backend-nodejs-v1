import type {
  CreateDraftBlogUseCaseRequest,
  CreateDraftBlogUseCaseResponse,
} from '@custom-types/use-cases/blogs/create-blog-draft'
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
import { extractProseMirrorImages } from '@services/extractors/extract-prose-mirror-images'
import { getProseMirrorText } from '@services/extractors/get-prose-mirror-text'
import { buildBlogImagePath } from '@services/files/build-blog-image-path'
import { persistBlogBanner } from '@services/files/persist-blog-banner'
import { persistBlogImage } from '@services/files/persist-blog-image'
import { validateActivityAreas } from '@services/validators/validate-activity-areas'
import { BlogInvalidImageLinkError } from '@use-cases/errors/blog/blog-invalid-image-link-error'
import { deleteFile } from '@utils/files/delete-file'
import { sanitizeUrlFilename } from '@utils/formatters/sanitize-url-filename'
import { ensureExists } from '@utils/validators/ensure'
import { inject, injectable } from 'tsyringe'
import { BlogBannerPersistError } from '../errors/blog/blog-banner-persist-error'
import { InvalidBlogContentError } from '../errors/blog/invalid-blog-content-error'
import { UserNotFoundError } from '../errors/user/user-not-found-error'

@injectable()
export class CreateDraftBlogUseCase {
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

  async execute(createDraftBlogUseCaseInput: CreateDraftBlogUseCaseRequest): Promise<CreateDraftBlogUseCaseResponse> {
    const searchContent = getProseMirrorText({ proseMirror: createDraftBlogUseCaseInput.content, tiptapConfiguration })

    if (!searchContent) {
      throw new InvalidBlogContentError()
    }

    // Persistir banner e imagens da pasta temporária para a pasta definitiva
    const persistedBanner = await persistBlogBanner({
      filename: createDraftBlogUseCaseInput.bannerImage,
    })

    if (!persistedBanner) {
      throw new BlogBannerPersistError()
    }

    const newBlogImages = extractProseMirrorImages(createDraftBlogUseCaseInput.content)

    try {
      // Persistindo as novas imagens do blog:
      await Promise.all(
        Array.from(newBlogImages).map(async (image) => {
          const filenameFromUrl = sanitizeUrlFilename(image)

          if (!filenameFromUrl) {
            throw new BlogInvalidImageLinkError()
          }

          await persistBlogImage({ filename: filenameFromUrl })
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
        value: await this.usersRepository.findByPublicId(createDraftBlogUseCaseInput.authorPublicId),
        error: new UserNotFoundError(),
      })

      const validatedSubactegories = await validateActivityAreas({
        activityAreasRepository: this.activityAreasRepository,
        activityAreas: createDraftBlogUseCaseInput.subcategories.map((subcategory) => ({
          area: subcategory,
          type: ActivityAreaType.SUB_AREA_OF_ACTIVITY,
        })),
      })

      const subcategoriesIds = validatedSubactegories.map((subcategory) => subcategory.id)

      const createdBlog = await this.blogsRepository.create({
        title: createDraftBlogUseCaseInput.title,
        bannerImage: createDraftBlogUseCaseInput.bannerImage,
        editorialStatus: EditorialStatusType.DRAFT,
        searchContent,
        subcategoriesIds,
        content: createDraftBlogUseCaseInput.content as InputJsonValue,
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
