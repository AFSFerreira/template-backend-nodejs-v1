import type {
  SubmitPublishedToPendingUseCaseRequest,
  SubmitPublishedToPendingUseCaseResponse,
} from '@custom-types/use-cases/blogs/submit-published-to-review'
import type { BlogsRepository } from '@repositories/blogs-repository'
import type { UsersRepository } from '@repositories/users-repository'
import { logger } from '@lib/pino'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { BLOG_SUBMITTED_PUBLISHED_TO_REVIEW } from '@messages/loggings/models/blog-loggings'
import { EditorialStatusType } from '@prisma/generated/enums'
import { BlogNotFoundError } from '@use-cases/errors/blog/blog-not-found-error'
import { BlogNotInPublishedStatusError } from '@use-cases/errors/blog/blog-not-in-published-status-error'
import { UserNotFoundError } from '@use-cases/errors/user/user-not-found-error'
import { ensureExists } from '@utils/validators/ensure'
import { inject, injectable } from 'tsyringe'

@injectable()
export class SubmitPublishedToPendingUseCase {
  constructor(
    @inject(tsyringeTokens.repositories.blogs)
    private readonly blogsRepository: BlogsRepository,

    @inject(tsyringeTokens.repositories.users)
    private readonly usersRepository: UsersRepository,
  ) {}

  async execute({
    publicId,
    userPublicId,
  }: SubmitPublishedToPendingUseCaseRequest): Promise<SubmitPublishedToPendingUseCaseResponse> {
    const user = ensureExists({
      value: await this.usersRepository.findByPublicId(userPublicId),
      error: new UserNotFoundError(),
    })

    const foundBlog = ensureExists({
      value: await this.blogsRepository.findByPublicId(publicId),
      error: new BlogNotFoundError(),
    })

    if (foundBlog.editorialStatus !== EditorialStatusType.PUBLISHED) {
      throw new BlogNotInPublishedStatusError()
    }

    const blog = await this.blogsRepository.updateStatus({
      id: foundBlog.id,
      status: EditorialStatusType.PENDING_APPROVAL,
    })

    logger.info(
      {
        blogPublicId: blog.publicId,
        title: blog.title,
        authorPublicId: user.publicId,
      },
      BLOG_SUBMITTED_PUBLISHED_TO_REVIEW,
    )

    return { blog }
  }
}
