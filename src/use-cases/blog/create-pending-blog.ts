import type { ImagePathInfo } from '@custom-types/custom/image-path-info'
import type {
  CreatePendingBlogUseCaseRequest,
  CreatePendingBlogUseCaseResponse,
} from '@custom-types/use-cases/blogs/create-blog'
import type { InputJsonValue } from '@prisma/client/runtime/client'
import type { ActivityAreasRepository } from '@repositories/activity-areas-repository'
import type { BlogsRepository } from '@repositories/blogs-repository'
import type { UsersRepository } from '@repositories/users-repository'
import { moveFileEnqueued } from '@jobs/queues/facades/file-queue-facade'
import { logger } from '@lib/logger'
import { tiptapConfiguration } from '@lib/tiptap/helpers/configuration'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { BLOG_CREATED_SUCCESSFULLY } from '@messages/loggings/models/blog-loggings'
import { ActivityAreaType, EditorialStatusType } from '@prisma/generated/enums'
import { buildBlogBannerPath, buildBlogTempBannerPath } from '@services/builders/paths/build-blog-banner-path'
import { buildBlogImagePath, buildBlogTempImagePath } from '@services/builders/paths/build-blog-image-path'
import { buildBlogBannerUrl } from '@services/builders/urls/build-blog-banner-url'
import { buildBlogImageUrl } from '@services/builders/urls/build-blog-image-url'
import { extractProseMirrorImages } from '@services/extractors/extract-prose-mirror-images'
import { getProseMirrorText } from '@services/extractors/get-prose-mirror-text'
import { replaceProseMirrorImages } from '@services/extractors/replace-prose-mirror-images'
import { validateActivityAreas } from '@services/validators/validate-activity-areas'
import { BlogInvalidImageLinkError } from '@use-cases/errors/blog/blog-invalid-image-link-error'
import { InvalidActivityArea } from '@use-cases/errors/user/invalid-activity-areas-error'
import { sanitizeUrlFilename } from '@utils/formatters/sanitize-url-filename'
import { ensureExists } from '@utils/validators/ensure'
import { inject, injectable } from 'tsyringe'
import { InvalidBlogContentError } from '../errors/blog/invalid-blog-content-error'
import { UserNotFoundError } from '../errors/user/user-not-found-error'

@injectable()
export class CreatePendingBlogUseCase {
  constructor(
    @inject(tsyringeTokens.repositories.activityAreas)
    private readonly activityAreasRepository: ActivityAreasRepository,

    @inject(tsyringeTokens.repositories.blogs)
    private readonly blogsRepository: BlogsRepository,

    @inject(tsyringeTokens.repositories.users)
    private readonly usersRepository: UsersRepository,
  ) {}

  async execute(
    createPendingBlogUseCaseInput: CreatePendingBlogUseCaseRequest,
  ): Promise<CreatePendingBlogUseCaseResponse> {
    const searchContent = ensureExists({
      value: getProseMirrorText({
        proseMirror: createPendingBlogUseCaseInput.content,
        tiptapConfiguration,
      }),
      error: new InvalidBlogContentError(),
    })

    const oldToNewImagesLinkMap = new Map<string, string>()

    const formatedBlogImages: ImagePathInfo[] = Array.from(
      extractProseMirrorImages(createPendingBlogUseCaseInput.content),
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
      proseMirror: createPendingBlogUseCaseInput.content,
      oldToNewImagesMap: oldToNewImagesLinkMap,
    })

    const author = ensureExists({
      value: await this.usersRepository.findByPublicId(createPendingBlogUseCaseInput.authorPublicId),
      error: new UserNotFoundError(),
    })

    const nonRepeatingSubcategories = Array.from<string>(new Set<string>(createPendingBlogUseCaseInput.subcategories))

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

    const blog = await this.blogsRepository.create({
      editorialStatus: EditorialStatusType.PENDING_APPROVAL,
      title: createPendingBlogUseCaseInput.title,
      bannerImage: createPendingBlogUseCaseInput.bannerImage,
      searchContent,
      subcategoriesIds,
      content: newProseMirror as InputJsonValue,
      authorName: author.fullName,
      userId: author.id,
    })

    const blogBannerPaths = {
      oldFilePath: buildBlogTempBannerPath(createPendingBlogUseCaseInput.bannerImage),
      newFilePath: buildBlogBannerPath(createPendingBlogUseCaseInput.bannerImage),
    }

    // Persistindo banner e imagens da pasta temporária para a pasta definitiva:
    await moveFileEnqueued(blogBannerPaths)

    await Promise.all(
      formatedBlogImages.map(async (imageInfo) => {
        await moveFileEnqueued(imageInfo)
      }),
    )

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
