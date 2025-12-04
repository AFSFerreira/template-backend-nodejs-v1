import type {
  FindBlogByPublicIdUseCaseRequest,
  FindBlogByPublicIdUseCaseResponse,
} from '@custom-types/use-cases/blogs/find-blog-by-public-id'
import { redis } from '@lib/redis'
import type { BlogsRepository } from '@repositories/blogs-repository'
import { registerBlogViews } from '@services/register-blog-views'
import { BlogNotFoundError } from '@use-cases/errors/blog/blog-not-found-error'
import { ensureExists } from '@utils/guards/ensure'

export class FindBlogByPublicIdUseCase {
  constructor(private readonly blogsRepository: BlogsRepository) {}

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
