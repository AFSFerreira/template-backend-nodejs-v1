import type { ImagePathInfo } from '@custom-types/custom/image-path-info'
import type {
  CreateDraftBlogUseCaseRequest,
  CreateDraftBlogUseCaseResponse,
} from '@custom-types/use-cases/blogs/create-blog-draft'
import type { DatabaseContext } from '@lib/prisma/helpers/database-context'
import type { InputJsonValue } from '@prisma/client/runtime/client'
import type { ActivityAreasRepository } from '@repositories/activity-areas-repository'
import type { BlogsRepository } from '@repositories/blogs-repository'
import type { UsersRepository } from '@repositories/users-repository'
import { moveFileEnqueued } from '@jobs/queues/facades/file-queue-facade'
import { logger } from '@lib/logger'
import { logError } from '@lib/logger/helpers/log-error'
import { tiptapConfiguration } from '@lib/tiptap/helpers/configuration'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { BLOG_CREATED_SUCCESSFULLY, BLOG_CREATION_ERROR } from '@messages/loggings/models/blog-loggings'
import { ActivityAreaType, EditorialStatusType } from '@prisma/generated/enums'
import { buildBlogBannerPath, buildBlogTempBannerPath } from '@services/builders/paths/build-blog-banner-path'
import { buildBlogImagePath, buildBlogTempImagePath } from '@services/builders/paths/build-blog-image-path'
import { buildBlogBannerUrl } from '@services/builders/urls/build-blog-banner-url'
import { buildBlogImageUrl } from '@services/builders/urls/build-blog-image-url'
import { extractProseMirrorImages } from '@services/extractors/extract-prose-mirror-images'
import { getProseMirrorText } from '@services/extractors/get-prose-mirror-text'
import { replaceProseMirrorImages } from '@services/extractors/replace-prose-mirror-images'
import { validateActivityAreas } from '@services/validators/validate-activity-areas'
import { BlogImagePersistError } from '@use-cases/errors/blog/blog-image-persist-error'
import { BlogInvalidImageLinkError } from '@use-cases/errors/blog/blog-invalid-image-link-error'
import { InvalidActivityArea } from '@use-cases/errors/user/invalid-activity-areas-error'
import { sanitizeUrlFilename } from '@utils/formatters/sanitize-url-filename'
import { ensureExists } from '@utils/validators/ensure'
import { inject, injectable } from 'tsyringe'
import { BlogBannerPersistError } from '../errors/blog/blog-banner-persist-error'
import { InvalidBlogContentError } from '../errors/blog/invalid-blog-content-error'
import { UserNotFoundError } from '../errors/user/user-not-found-error'

@injectable()
export class CreateDraftBlogUseCase {
  constructor(
    @inject(tsyringeTokens.repositories.activityAreas)
    private readonly activityAreasRepository: ActivityAreasRepository,

    @inject(tsyringeTokens.repositories.blogs)
    private readonly blogsRepository: BlogsRepository,

    @inject(tsyringeTokens.repositories.users)
    private readonly usersRepository: UsersRepository,

    @inject(tsyringeTokens.infra.database)
    private readonly dbContext: DatabaseContext,
  ) {}

  async execute(createDraftBlogUseCaseInput: CreateDraftBlogUseCaseRequest): Promise<CreateDraftBlogUseCaseResponse> {
    const searchContent = ensureExists({
      value: getProseMirrorText({ proseMirror: createDraftBlogUseCaseInput.content, tiptapConfiguration }),
      error: new InvalidBlogContentError(),
    })

    const oldToNewImagesLinkMap = new Map<string, string>()

    const formatedBlogImages: ImagePathInfo[] = Array.from(
      extractProseMirrorImages(createDraftBlogUseCaseInput.content),
    ).map((imageLink) => {
      const imageName = ensureExists({
        value: sanitizeUrlFilename(imageLink),
        error: new BlogInvalidImageLinkError(),
      })

      oldToNewImagesLinkMap.set(imageLink, buildBlogImageUrl(imageName))

      return {
        oldFilePath: buildBlogTempImagePath(imageName),
        newFilePath: buildBlogImagePath(imageName),
      }
    })

    const newProseMirror = replaceProseMirrorImages({
      proseMirror: createDraftBlogUseCaseInput.content,
      oldToNewImagesMap: oldToNewImagesLinkMap,
    })

    const { author, blog } = await this.dbContext.runInTransaction(async () => {
      const author = ensureExists({
        value: await this.usersRepository.findByPublicId(createDraftBlogUseCaseInput.authorPublicId),
        error: new UserNotFoundError(),
      })

      const nonRepeatingSubcategories = Array.from<string>(new Set<string>(createDraftBlogUseCaseInput.subcategories))

      const { validatedActivityAreas, success } = await validateActivityAreas({
        activityAreasRepository: this.activityAreasRepository,
        activityAreas: nonRepeatingSubcategories.map((subcategory) => ({
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
        title: createDraftBlogUseCaseInput.title,
        bannerImage: createDraftBlogUseCaseInput.bannerImage,
        editorialStatus: EditorialStatusType.DRAFT,
        searchContent,
        subcategoriesIds,
        content: newProseMirror as InputJsonValue,
        authorName: author.fullName,
        userId: author.id,
      })

      return { author, blog: createdBlog }
    })

    const blogBannerPaths = {
      oldFilePath: buildBlogTempBannerPath(createDraftBlogUseCaseInput.bannerImage),
      newFilePath: buildBlogBannerPath(createDraftBlogUseCaseInput.bannerImage),
    }

    try {
      // Persistir banner e imagens da pasta temporária para a pasta definitiva:
      ensureExists({
        value: await moveFileEnqueued(blogBannerPaths),
        error: new BlogBannerPersistError(),
      })

      await Promise.all(
        formatedBlogImages.map(async (imageInfo) => {
          ensureExists({
            value: await moveFileEnqueued(imageInfo),
            error: new BlogImagePersistError(),
          })
        }),
      )
    } catch (error) {
      logError({ error, message: BLOG_CREATION_ERROR })

      // Restaurando as imagens de blog e a imagem de banner previamente persistida:
      await moveFileEnqueued({
        oldFilePath: blogBannerPaths.newFilePath,
        newFilePath: blogBannerPaths.oldFilePath,
      })

      for (const imageInfo of formatedBlogImages) {
        await moveFileEnqueued({
          oldFilePath: imageInfo.newFilePath,
          newFilePath: imageInfo.oldFilePath,
        })
      }

      throw error
    }

    logger.info(
      {
        blogPublicId: blog.publicId,
        title: blog.title,
        authorPublicId: author.publicId,
      },
      BLOG_CREATED_SUCCESSFULLY,
    )

    return {
      blog: {
        ...blog,
        bannerImage: buildBlogBannerUrl(blog.bannerImage),
      },
    }
  }
}
