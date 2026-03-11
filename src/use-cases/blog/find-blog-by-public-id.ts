import type {
  FindBlogByPublicIdUseCaseRequest,
  FindBlogByPublicIdUseCaseResponse,
} from '@custom-types/use-cases/blogs/find-blog-by-public-id'
import type { BlogsRepository } from '@repositories/blogs-repository'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { EditorialStatusType } from '@prisma/generated/enums'
import { RegisterBlogViewsCacheService } from '@services/caches/register-blog-views-cache'
import { BlogNotFoundError } from '@use-cases/errors/blog/blog-not-found-error'
import { ensureExists } from '@utils/validators/ensure'
import { inject, singleton } from 'tsyringe'

@singleton()
export class FindBlogByPublicIdUseCase {
  constructor(
    @inject(tsyringeTokens.repositories.blogs)
    private readonly blogsRepository: BlogsRepository,

    @inject(RegisterBlogViewsCacheService)
    private readonly registerBlogViewsCacheService: RegisterBlogViewsCacheService,
  ) {}

  async execute({ publicId, ip }: FindBlogByPublicIdUseCaseRequest): Promise<FindBlogByPublicIdUseCaseResponse> {
    const foundBlog = ensureExists({
      value: await this.blogsRepository.findByPublicId(publicId),
      error: new BlogNotFoundError(),
    })

    // NOTE: Por questões de segurança, emitir um erro genérico quando o
    // usuário não puder acessar um blog que ainda não foi publicado:
    if (foundBlog.editorialStatus !== EditorialStatusType.PUBLISHED) {
      throw new BlogNotFoundError()
    }

    const blogWasNotRecentlyViewed = await this.registerBlogViewsCacheService.register(foundBlog.id, ip)

    if (blogWasNotRecentlyViewed) {
      await this.blogsRepository.incrementAccessesNumber(foundBlog.id)
    }

    const blog = {
      ...foundBlog,
      accessCount: foundBlog.accessCount + (blogWasNotRecentlyViewed ? 1 : 0),
    }

    return { blog }
  }
}
