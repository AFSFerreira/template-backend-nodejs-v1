import type {
  SubmitDraftForReviewUseCaseRequest,
  SubmitDraftForReviewUseCaseResponse,
} from '@custom-types/use-cases/blogs/submit-draft-for-review'
import { logger } from '@lib/logger'
import type { DatabaseContext } from '@lib/prisma/helpers/database-context'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { BLOG_SUBMITTED_FOR_REVIEW } from '@messages/loggings/models/blog-loggings'
import { EditorialStatusType } from '@prisma/generated/enums'
import type { BlogsRepository } from '@repositories/blogs-repository'
import type { UsersRepository } from '@repositories/users-repository'
import { buildBlogBannerUrl } from '@services/builders/urls/build-blog-banner-url'
import { BlogNotFoundError } from '@use-cases/errors/blog/blog-not-found-error'
import { BlogNotInDraftStatusError } from '@use-cases/errors/blog/blog-not-in-draft-status-error'
import { UserNotFoundError } from '@use-cases/errors/user/user-not-found-error'
import { ensureExists } from '@utils/validators/ensure'
import { inject, injectable } from 'tsyringe'

@injectable()
export class SubmitDraftForReviewUseCase {
  constructor(
    @inject(tsyringeTokens.repositories.blogs)
    private readonly blogsRepository: BlogsRepository,

    @inject(tsyringeTokens.repositories.users)
    private readonly usersRepository: UsersRepository,

    @inject(tsyringeTokens.infra.database)
    private readonly dbContext: DatabaseContext,
  ) {}

  async execute({
    publicId,
    userPublicId,
  }: SubmitDraftForReviewUseCaseRequest): Promise<SubmitDraftForReviewUseCaseResponse> {
    const { blog, user } = await this.dbContext.runInTransaction(async () => {
      const user = ensureExists({
        value: await this.usersRepository.findByPublicId(userPublicId),
        error: new UserNotFoundError(),
      })

      const blog = ensureExists({
        value: await this.blogsRepository.findByPublicId(publicId),
        error: new BlogNotFoundError(),
      })

      if (blog.editorialStatus !== EditorialStatusType.DRAFT) {
        throw new BlogNotInDraftStatusError()
      }

      if (blog.userId !== user.id) {
        throw new BlogNotFoundError()
      }

      const updatedBlog = await this.blogsRepository.updateStatus({
        id: blog.id,
        status: EditorialStatusType.PENDING_APPROVAL,
      })

      return { blog: updatedBlog, user }
    })

    logger.info(
      {
        blogPublicId: blog.publicId,
        title: blog.title,
        authorPublicId: user.publicId,
      },
      BLOG_SUBMITTED_FOR_REVIEW,
    )

    return {
      blog: {
        ...blog,
        bannerImage: buildBlogBannerUrl(blog.bannerImage),
      },
    }
  }
}
