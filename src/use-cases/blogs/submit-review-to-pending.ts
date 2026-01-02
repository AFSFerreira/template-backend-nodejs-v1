import type {
  SubmitReviewToPendingUseCaseRequest,
  SubmitReviewToPendingUseCaseResponse,
} from '@custom-types/use-cases/blogs/submit-review-to-pending'
import type { DatabaseContext } from '@lib/prisma/helpers/database-context'
import type { BlogsRepository } from '@repositories/blogs-repository'
import type { UsersRepository } from '@repositories/users-repository'
import { logger } from '@lib/logger'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import { BLOG_SUBMITTED_REVIEW_TO_PENDING } from '@messages/loggings/blog-loggings'
import { EditorialStatusType } from '@prisma/client'
import { buildBlogBannerUrl } from '@services/builders/urls/build-blog-banner-url'
import { BlogNotFoundError } from '@use-cases/errors/blog/blog-not-found-error'
import { BlogNotInChangesRequestedStatusError } from '@use-cases/errors/blog/blog-not-in-changes-requested-status-error'
import { UserNotFoundError } from '@use-cases/errors/user/user-not-found-error'
import { ensureExists } from '@utils/validators/ensure'
import { inject, injectable } from 'tsyringe'

@injectable()
export class SubmitReviewToPendingUseCase {
  constructor(
    @inject(tokens.repositories.blogs)
    private readonly blogsRepository: BlogsRepository,

    @inject(tokens.repositories.users)
    private readonly usersRepository: UsersRepository,

    @inject(tokens.infra.database)
    private readonly dbContext: DatabaseContext,
  ) {}

  async execute({
    publicId,
    userPublicId,
  }: SubmitReviewToPendingUseCaseRequest): Promise<SubmitReviewToPendingUseCaseResponse> {
    const { blog, user } = await this.dbContext.runInTransaction(async () => {
      const user = ensureExists({
        value: await this.usersRepository.findByPublicId(userPublicId),
        error: new UserNotFoundError(),
      })

      const blog = ensureExists({
        value: await this.blogsRepository.findByPublicId(publicId),
        error: new BlogNotFoundError(),
      })

      if (blog.editorialStatus !== EditorialStatusType.CHANGES_REQUESTED) {
        throw new BlogNotInChangesRequestedStatusError()
      }

      const updatedBlog = await this.blogsRepository.updateStatus({
        id: blog.id,
        status: EditorialStatusType.PENDING_APPROVAL,
      })

      return { blog: updatedBlog, user }
    })

    logger.info({
      message: BLOG_SUBMITTED_REVIEW_TO_PENDING,
      blog,
      user,
    })

    return {
      blog: {
        ...blog,
        bannerImage: buildBlogBannerUrl(blog.bannerImage),
      },
    }
  }
}
