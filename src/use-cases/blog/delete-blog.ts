import type { DeleteBlogUseCaseRequest, DeleteBlogUseCaseResponse } from '@custom-types/use-cases/blogs/delete-blog'
import type { BlogsRepository } from '@repositories/blogs-repository'
import type { UsersRepository } from '@repositories/users-repository'
import { CONTENT_LEADER_PERMISSIONS, PENDING_APPROVAL_OR_PUBLISHED } from '@constants/sets'
import { deleteFileEnqueued } from '@jobs/queues/facades/file-queue-facade'
import { logger } from '@lib/pino'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { BLOG_DELETION_SUCCESSFUL } from '@messages/loggings/models/blog-loggings'
import { BlogHtmlCacheService } from '@services/caches/blogs-html-cache'
import { UserNotFoundError } from '@use-cases/errors/user/user-not-found-error'
import { buildBlogBannerPath } from '@utils/builders/paths/build-blog-banner-path'
import { ensureExists } from '@utils/validators/ensure'
import { inject, injectable } from 'tsyringe'
import { BlogDeletionForbiddenError } from '../errors/blog/blog-deletion-forbidden-error'
import { BlogNotFoundError } from '../errors/blog/blog-not-found-error'

@injectable()
export class DeleteBlogUseCase {
  constructor(
    @inject(tsyringeTokens.repositories.blogs)
    private readonly blogsRepository: BlogsRepository,

    @inject(tsyringeTokens.repositories.users)
    private readonly usersRepository: UsersRepository,

    @inject(BlogHtmlCacheService)
    private readonly blogHtmlCacheService: BlogHtmlCacheService,
  ) {}

  async execute({ publicId, userPublicId }: DeleteBlogUseCaseRequest): Promise<DeleteBlogUseCaseResponse> {
    const blog = ensureExists({
      value: await this.blogsRepository.findByPublicId(publicId),
      error: new BlogNotFoundError(),
    })

    const user = ensureExists({
      value: await this.usersRepository.findByPublicId(userPublicId),
      error: new UserNotFoundError(),
    })

    // Se o usuário for um produtor de conteúdo e o usuário não é autor do blog:
    const userHaveNoPermissionAndIsNoBlogAuthor = !CONTENT_LEADER_PERMISSIONS.has(user.role) && blog.userId !== user.id

    // Se o usuário for um produtor de conteúdo e o blog está publicado ou aguardando aprovação:
    const userHaveNoPermissionAndBlogIsPosted =
      PENDING_APPROVAL_OR_PUBLISHED.has(blog.editorialStatus) &&
      !CONTENT_LEADER_PERMISSIONS.has(user.role) &&
      blog.userId === user.id

    if (userHaveNoPermissionAndIsNoBlogAuthor || userHaveNoPermissionAndBlogIsPosted) {
      throw new BlogDeletionForbiddenError()
    }

    await this.blogsRepository.delete(blog.id)

    await deleteFileEnqueued({
      filePath: buildBlogBannerPath(blog.bannerImage),
    })

    // Removendo o cache HTML do blog:
    await this.blogHtmlCacheService.remove(blog.publicId)

    logger.info({ blogId: blog.id, title: blog.title }, BLOG_DELETION_SUCCESSFUL)

    return {}
  }
}
