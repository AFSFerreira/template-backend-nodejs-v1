import type { CreateBlogUseCaseRequest, CreateBlogUseCaseResponse } from '@custom-types/use-cases/blogs/create-blog'
import type { DatabaseContext } from '@lib/prisma/helpers/database-context'
import type { InputJsonValue } from '@prisma/client/runtime/client'
import type { ActivityAreasRepository } from '@repositories/activity-areas-repository'
import type { BlogsRepository } from '@repositories/blogs-repository'
import type { UsersRepository } from '@repositories/users-repository'
import { logger } from '@lib/logger'
import { tiptapConfiguration } from '@lib/tiptap/helpers/configuration'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import { BLOG_CREATED_SUCCESSFULLY } from '@messages/loggings/blog-loggings'
import { ActivityAreaType } from '@prisma/client'
import { getProseMirrorText } from '@services/extractors/get-prose-mirror-text'
import { persistBlogBanner } from '@services/files/persist-blog-banner'
import { persistBlogImage } from '@services/files/persist-blog-image'
import { validateActivityAreas } from '@services/validators/validate-activity-areas'
import { ensureExists } from '@utils/guards/ensure'
import { inject, injectable } from 'tsyringe'
import { BlogBannerPersistError } from '../errors/blog/blog-banner-persist-error'
import { InvalidBlogContentError } from '../errors/blog/invalid-blog-content-error'
import { UserNotFoundError } from '../errors/user/user-not-found-error'
import { BlogImagePersistError } from '@use-cases/errors/blog/blog-image-persist-error'

@injectable()
export class CreateBlogUseCase {
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

  async execute(createBlogUseCaseInput: CreateBlogUseCaseRequest): Promise<CreateBlogUseCaseResponse> {
    const searchContent = getProseMirrorText({ proseMirror: createBlogUseCaseInput.content, tiptapConfiguration })

    if (!searchContent) {
      throw new InvalidBlogContentError()
    }

    // Persistir banner e imagens da pasta temporária para a pasta definitiva
    const persistedBanner = await persistBlogBanner(createBlogUseCaseInput.bannerImage)
    if (!persistedBanner) {
      throw new BlogBannerPersistError()
    }

    const persistedImages: string[] = []
    for (const imageName of createBlogUseCaseInput.blogImages) {
      const persistedImage = await persistBlogImage(imageName)
      if (!persistedImage) {
        throw new BlogImagePersistError()
      }
      persistedImages.push(persistedImage)
    }

    const { author, blog } = await this.dbContext.runInTransaction(async () => {
      const { authorPublicId, subcategories, content, blogImages, ...filteredBlogCreateInput } = createBlogUseCaseInput

      const author = ensureExists({
        value: await this.usersRepository.findByPublicId(createBlogUseCaseInput.authorPublicId),
        error: new UserNotFoundError(),
      })

      const validatedSubactegories = await validateActivityAreas({
        activityAreasRepository: this.activityAreasRepository,
        activityAreas: subcategories.map((subcategory) => ({
          area: subcategory,
          type: ActivityAreaType.SUB_AREA_OF_ACTIVITY,
        })),
      })

      const subcategoriesIds = validatedSubactegories.map((subcategory) => subcategory.id)

      const createdBlog = await this.blogsRepository.create({
        ...filteredBlogCreateInput,
        searchContent,
        subcategoriesIds,
        content: createBlogUseCaseInput.content as InputJsonValue,
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
