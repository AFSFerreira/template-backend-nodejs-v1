import type { ImagePathInfo } from '@custom-types/custom/image-path-info'
import type {
  CreateAndPublishBlogUseCaseRequest,
  CreateAndPublishBlogUseCaseResponse,
} from '@custom-types/use-cases/blogs/create-and-publish-blog'
import type { InputJsonValue } from '@prisma/client/runtime/client'
import type { ActivityAreasRepository } from '@repositories/activity-areas-repository'
import type { BlogsRepository } from '@repositories/blogs-repository'
import type { UsersRepository } from '@repositories/users-repository'
import { logger } from '@lib/pino'
import { tiptapConfiguration } from '@lib/tiptap/helpers/configuration'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { BLOG_CREATED_SUCCESSFULLY } from '@messages/loggings/models/blog-loggings'
import { ActivityAreaType, EditorialStatusType } from '@prisma/generated/enums'
import { buildBlogBannerPath, buildBlogTempBannerPath } from '@services/builders/paths/build-blog-banner-path'
import { buildBlogImagePath, buildBlogTempImagePath } from '@services/builders/paths/build-blog-image-path'
import { buildBlogImageUrl } from '@services/builders/urls/build-blog-image-url'
import { extractProseMirrorImages } from '@services/extractors/extract-prose-mirror-images'
import { getProseMirrorText } from '@services/extractors/get-prose-mirror-text'
import { replaceProseMirrorImages } from '@services/extractors/replace-prose-mirror-images'
import { validateActivityAreas } from '@services/validators/validate-activity-areas'
import { BlogInvalidImageLinkError } from '@use-cases/errors/blog/blog-invalid-image-link-error'
import { InvalidActivityArea } from '@use-cases/errors/user/invalid-activity-areas-error'
import { moveFilesIfNotExists } from '@utils/files/move-files-if-not-exists'
import { sanitizeUrlFilename } from '@utils/formatters/sanitize-url-filename'
import { ensureExists } from '@utils/validators/ensure'
import { inject, injectable } from 'tsyringe'
import { InvalidBlogContentError } from '../errors/blog/invalid-blog-content-error'
import { UserNotFoundError } from '../errors/user/user-not-found-error'

@injectable()
export class CreateAndPublishBlogUseCase {
  constructor(
    @inject(tsyringeTokens.repositories.activityAreas)
    private readonly activityAreasRepository: ActivityAreasRepository,

    @inject(tsyringeTokens.repositories.blogs)
    private readonly blogsRepository: BlogsRepository,

    @inject(tsyringeTokens.repositories.users)
    private readonly usersRepository: UsersRepository,
  ) {}

  async execute(
    publishBlogUseCaseInput: CreateAndPublishBlogUseCaseRequest,
  ): Promise<CreateAndPublishBlogUseCaseResponse> {
    const searchContent = ensureExists({
      value: getProseMirrorText({ proseMirror: publishBlogUseCaseInput.content, tiptapConfiguration }),
      error: new InvalidBlogContentError(),
    })

    const oldToNewImagesLinkMap = new Map<string, string>()

    const formatedBlogImages: ImagePathInfo[] = Array.from(
      extractProseMirrorImages(publishBlogUseCaseInput.content),
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
      proseMirror: publishBlogUseCaseInput.content,
      oldToNewImagesMap: oldToNewImagesLinkMap,
    })

    const author = ensureExists({
      value: await this.usersRepository.findByPublicId(publishBlogUseCaseInput.authorPublicId),
      error: new UserNotFoundError(),
    })

    const nonRepeatingSubcategories = Array.from<string>(new Set<string>(publishBlogUseCaseInput.subcategories))

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
      title: publishBlogUseCaseInput.title,
      bannerImage: publishBlogUseCaseInput.bannerImage,
      editorialStatus: EditorialStatusType.PUBLISHED,
      searchContent,
      subcategoriesIds,
      content: newProseMirror as InputJsonValue,
      authorName: author.fullName,
      userId: author.id,
    })

    const blogBannerPaths = {
      oldFilePath: buildBlogTempBannerPath(publishBlogUseCaseInput.bannerImage),
      newFilePath: buildBlogBannerPath(publishBlogUseCaseInput.bannerImage),
    }

    // Persistir banner e imagens da pasta temporária para a pasta definitiva
    await moveFilesIfNotExists([...formatedBlogImages, blogBannerPaths])

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
