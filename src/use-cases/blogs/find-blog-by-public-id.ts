import type {
  FindBlogByPublicIdUseCaseRequest,
  FindBlogByPublicIdUseCaseResponse,
} from '@custom-types/use-cases/blogs/find-blog-by-public-id'
import type { DatabaseContext } from '@lib/prisma/helpers/database-context'
import type { BlogsRepository } from '@repositories/blogs-repository'
import { redis } from '@lib/redis'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { EditorialStatusType } from '@prisma/generated/enums'
import { buildBlogBannerUrl } from '@services/builders/urls/build-blog-banner-url'
import { registerBlogViews } from '@services/cache/register-blog-views-cache'
import { BlogNotFoundError } from '@use-cases/errors/blog/blog-not-found-error'
import { ensureExists } from '@utils/validators/ensure'
import { inject, injectable } from 'tsyringe'

@injectable()
export class FindBlogByPublicIdUseCase {
  constructor(
    @inject(tsyringeTokens.repositories.blogs)
    private readonly blogsRepository: BlogsRepository,

    @inject(tsyringeTokens.infra.database)
    private readonly dbContext: DatabaseContext,
  ) {}

  async execute({ publicId, ip }: FindBlogByPublicIdUseCaseRequest): Promise<FindBlogByPublicIdUseCaseResponse> {
    const { blog } = await this.dbContext.runInTransaction(async () => {
      const blog = ensureExists({
        value: await this.blogsRepository.findByPublicId(publicId),
        error: new BlogNotFoundError(),
      })

      // NOTE: Por questões de segurança, emitir um erro genérico quando o
      // usuário não puder acessar um blog que ainda não foi publicado:
      if (blog.editorialStatus !== EditorialStatusType.PUBLISHED) {
        throw new BlogNotFoundError()
      }

      const blogWasNotRecentlyViewed = await registerBlogViews({
        blogId: blog.id,
        ip,
        redis,
      })

      if (blogWasNotRecentlyViewed) {
        await this.blogsRepository.incrementAccessesNumber(blog.id)
      }

      return {
        blog: {
          ...blog,
          bannerImage: buildBlogBannerUrl(blog.bannerImage),
          accessCount: blog.accessCount + (blogWasNotRecentlyViewed ? 1 : 0),
        },
      }
    })

    return { blog }
  }
}
