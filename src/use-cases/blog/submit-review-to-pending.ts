import type {
  SubmitReviewToPendingUseCaseRequest,
  SubmitReviewToPendingUseCaseResponse,
} from '@custom-types/use-cases/blogs/submit-review-to-pending'
import type { BlogsRepository } from '@repositories/blogs-repository'
import type { UsersRepository } from '@repositories/users-repository'
import { logger } from '@lib/pino'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { BLOG_SUBMITTED_REVIEW_TO_PENDING } from '@messages/loggings/models/blog-loggings'
import { EditorialStatusType } from '@prisma/generated/enums'
import { BlogNotFoundError } from '@use-cases/errors/blog/blog-not-found-error'
import { BlogNotInChangesRequestedStatusError } from '@use-cases/errors/blog/blog-not-in-changes-requested-status-error'
import { UserNotFoundError } from '@use-cases/errors/user/user-not-found-error'
import { ensureExists } from '@utils/validators/ensure'
import { inject, injectable } from 'tsyringe'

@injectable()
export class SubmitReviewToPendingUseCase {
  constructor(
    @inject(tsyringeTokens.repositories.blogs)
    private readonly blogsRepository: BlogsRepository,

    @inject(tsyringeTokens.repositories.users)
    private readonly usersRepository: UsersRepository,
  ) {}

  async execute({
    publicId,
    userPublicId,
  }: SubmitReviewToPendingUseCaseRequest): Promise<SubmitReviewToPendingUseCaseResponse> {
    const user = ensureExists({
      value: await this.usersRepository.findByPublicId(userPublicId),
      error: new UserNotFoundError(),
    })

    const foundBlog = ensureExists({
      value: await this.blogsRepository.findByPublicId(publicId),
      error: new BlogNotFoundError(),
    })

    if (foundBlog.editorialStatus !== EditorialStatusType.CHANGES_REQUESTED) {
      throw new BlogNotInChangesRequestedStatusError()
    }

    const blog = await this.blogsRepository.updateStatus({
      id: foundBlog.id,
      status: EditorialStatusType.PENDING_APPROVAL,
    })

    logger.info({
      message: BLOG_SUBMITTED_REVIEW_TO_PENDING,
      blog,
      user,
    })

    return { blog }
  }
}
