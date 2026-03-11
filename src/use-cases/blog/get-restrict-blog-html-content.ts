import type {
  GetRestrictBlogHTMLContentUseCaseRequest,
  GetRestrictBlogHTMLContentUseCaseResponse,
} from '@custom-types/use-cases/blogs/get-restrict-blog-html-content'
import type { BlogsRepository } from '@repositories/blogs-repository'
import type { UsersRepository } from '@repositories/users-repository'
import type { JSONContent } from '@tiptap/core'
import { CONTENT_LEADER_PERMISSIONS } from '@constants/sets'
import { tiptapConfiguration } from '@lib/tiptap/helpers/configuration'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { BlogHtmlCacheService } from '@services/caches/blogs-html-cache'
import { TipTapRendererService } from '@services/formatters/generate-prose-mirror-html'
import { BlogAccessForbiddenError } from '@use-cases/errors/blog/blog-access-forbidden-error'
import { BlogNotFoundError } from '@use-cases/errors/blog/blog-not-found-error'
import { UserNotFoundError } from '@use-cases/errors/user/user-not-found-error'
import { ensureExists } from '@utils/validators/ensure'
import { inject, injectable } from 'tsyringe'

@injectable()
export class GetRestrictBlogHTMLContentUseCase {
  constructor(
    @inject(tsyringeTokens.repositories.blogs)
    private readonly blogsRepository: BlogsRepository,

    @inject(tsyringeTokens.repositories.users)
    private readonly usersRepository: UsersRepository,

    @inject(BlogHtmlCacheService)
    private readonly blogHtmlCacheService: BlogHtmlCacheService,

    @inject(TipTapRendererService)
    private readonly tipTapRendererService: TipTapRendererService,
  ) {}

  async execute({
    publicId,
    userPublicId,
  }: GetRestrictBlogHTMLContentUseCaseRequest): Promise<GetRestrictBlogHTMLContentUseCaseResponse> {
    const user = ensureExists({
      value: await this.usersRepository.findByPublicId(userPublicId),
      error: new UserNotFoundError(),
    })

    const cachedBlogHtml = await this.blogHtmlCacheService.get(publicId)

    if (cachedBlogHtml) return { htmlContent: cachedBlogHtml }

    const blog = ensureExists({
      value: await this.blogsRepository.findByPublicId(publicId),
      error: new BlogNotFoundError(),
    })

    if (!CONTENT_LEADER_PERMISSIONS.has(user.role) && blog.userId !== user.id) {
      throw new BlogAccessForbiddenError()
    }

    const blogProseMirror = blog.content as JSONContent

    const htmlContent = await this.tipTapRendererService.generateProseMirrorHtmlWeb(
      blogProseMirror,
      tiptapConfiguration,
    )

    await this.blogHtmlCacheService.set(publicId, htmlContent)

    return { htmlContent }
  }
}
