import type {
  SubmitPendingToReviewUseCaseRequest,
  SubmitPendingToReviewUseCaseResponse,
} from '@custom-types/use-cases/blogs/submit-pending-to-review'
import type { BlogsRepository } from '@repositories/blogs-repository'
import type { UsersRepository } from '@repositories/users-repository'
import { logger } from '@lib/pino'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { BLOG_SUBMITTED_PENDING_TO_REVIEW } from '@messages/loggings/models/blog-loggings'
import { EditorialStatusType } from '@prisma/generated/enums'
import { BlogNotFoundError } from '@use-cases/errors/blog/blog-not-found-error'
import { BlogNotInPendingApprovalStatusError } from '@use-cases/errors/blog/blog-not-in-pending-approval-status-error'
import { UserNotFoundError } from '@use-cases/errors/user/user-not-found-error'
import { ensureExists } from '@utils/validators/ensure'
import { inject, singleton } from 'tsyringe'

@singleton()
export class SubmitPendingToReviewUseCase {
  constructor(
    @inject(tsyringeTokens.repositories.blogs)
    private readonly blogsRepository: BlogsRepository,

    @inject(tsyringeTokens.repositories.users)
    private readonly usersRepository: UsersRepository,
  ) {}

  async execute({
    publicId,
    userPublicId,
  }: SubmitPendingToReviewUseCaseRequest): Promise<SubmitPendingToReviewUseCaseResponse> {
    const user = ensureExists({
      value: await this.usersRepository.findByPublicId(userPublicId),
      error: new UserNotFoundError(),
    })

    const foundBlog = ensureExists({
      value: await this.blogsRepository.findByPublicId(publicId),
      error: new BlogNotFoundError(),
    })

    if (foundBlog.editorialStatus !== EditorialStatusType.PENDING_APPROVAL) {
      throw new BlogNotInPendingApprovalStatusError()
    }

    const blog = await this.blogsRepository.updateStatus({
      id: foundBlog.id,
      status: EditorialStatusType.CHANGES_REQUESTED,
    })

    logger.info({
      message: BLOG_SUBMITTED_PENDING_TO_REVIEW,
      blog,
      user,
    })

    return { blog }
  }
}
