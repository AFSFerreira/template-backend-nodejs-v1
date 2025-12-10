import type {
  FindBlogByPublicIdUseCaseRequest,
  FindBlogByPublicIdUseCaseResponse,
} from '@custom-types/use-cases/blogs/find-blog-by-public-id'
import type { BlogsRepository } from '@repositories/blogs-repository'
import { redis } from '@lib/redis'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import { registerBlogViews } from '@services/cache/register-blog-views'
import { BlogNotFoundError } from '@use-cases/errors/blog/blog-not-found-error'
import { ensureExists } from '@utils/guards/ensure'
import { inject, injectable } from 'tsyringe'

@injectable()
export class FindBlogByPublicIdUseCase {
  constructor(
    @inject(tokens.repositories.blogs)
    private readonly blogsRepository: BlogsRepository,
  ) {}

  async execute({ publicId, ip }: FindBlogByPublicIdUseCaseRequest): Promise<FindBlogByPublicIdUseCaseResponse> {
    const blog = ensureExists({
      value: await this.blogsRepository.findByPublicId(publicId),
      error: new BlogNotFoundError(),
    })

    const blogWasNotRecentlyViewed = await registerBlogViews({
      blogId: blog.id,
      ip,
      redis,
    })

    if (blogWasNotRecentlyViewed) {
      this.blogsRepository.incrementAccessesNumber(blog.id)
    }

    return {
      blog: {
        ...blog,
        accessCount: blog.accessCount + (blogWasNotRecentlyViewed ? 1 : 0),
      },
    }
  }
}
