import type {
  SubmitPendingToPublishUseCaseRequest,
  SubmitPendingToPublishUseCaseResponse,
} from '@custom-types/use-cases/blogs/submit-review-to-publish'
import type { DatabaseContext } from '@lib/prisma/helpers/database-context'
import type { BlogsRepository } from '@repositories/blogs-repository'
import type { UsersRepository } from '@repositories/users-repository'
import { logger } from '@lib/logger'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { BLOG_SUBMITTED_TO_PUBLISH } from '@messages/loggings/models/blog-loggings'
import { EditorialStatusType } from '@prisma/generated/enums'
import { buildBlogBannerUrl } from '@services/builders/urls/build-blog-banner-url'
import { BlogNotFoundError } from '@use-cases/errors/blog/blog-not-found-error'
import { BlogNotInPendingApprovalStatusError } from '@use-cases/errors/blog/blog-not-in-pending-approval-status-error'
import { UserNotFoundError } from '@use-cases/errors/user/user-not-found-error'
import { ensureExists } from '@utils/validators/ensure'
import { inject, injectable } from 'tsyringe'

@injectable()
export class SubmitPendingToPublishUseCase {
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
  }: SubmitPendingToPublishUseCaseRequest): Promise<SubmitPendingToPublishUseCaseResponse> {
    const { blog, user } = await this.dbContext.runInTransaction(async () => {
      const user = ensureExists({
        value: await this.usersRepository.findByPublicId(userPublicId),
        error: new UserNotFoundError(),
      })

      const blog = ensureExists({
        value: await this.blogsRepository.findByPublicId(publicId),
        error: new BlogNotFoundError(),
      })

      if (blog.editorialStatus !== EditorialStatusType.PENDING_APPROVAL) {
        throw new BlogNotInPendingApprovalStatusError()
      }

      const updatedBlog = await this.blogsRepository.updateStatus({
        id: blog.id,
        status: EditorialStatusType.PUBLISHED,
      })

      return { blog: updatedBlog, user }
    })

    logger.info(
      {
        blogPublicId: blog.publicId,
        title: blog.title,
        authorPublicId: user.publicId,
      },
      BLOG_SUBMITTED_TO_PUBLISH,
    )

    return {
      blog: {
        ...blog,
        bannerImage: buildBlogBannerUrl(blog.bannerImage),
      },
    }
  }
}
