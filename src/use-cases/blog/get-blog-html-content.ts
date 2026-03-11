import type {
  GetBlogHTMLContentUseCaseRequest,
  GetBlogHTMLContentUseCaseResponse,
} from '@custom-types/use-cases/blogs/get-blog-html-content'
import type { BlogsRepository } from '@repositories/blogs-repository'
import type { JSONContent } from '@tiptap/core'
import { tiptapConfiguration } from '@lib/tiptap/helpers/configuration'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { EditorialStatusType } from '@prisma/generated/enums'
import { BlogHtmlCacheService } from '@services/caches/blogs-html-cache'
import { TipTapRendererService } from '@services/formatters/generate-prose-mirror-html'
import { BlogNotFoundError } from '@use-cases/errors/blog/blog-not-found-error'
import { ensureExists } from '@utils/validators/ensure'
import { inject, injectable } from 'tsyringe'

@injectable()
export class GetBlogHTMLContentUseCase {
  constructor(
    @inject(tsyringeTokens.repositories.blogs)
    private readonly blogsRepository: BlogsRepository,

    @inject(TipTapRendererService)
    private readonly rendererService: TipTapRendererService,

    @inject(BlogHtmlCacheService)
    private readonly blogHtmlCacheService: BlogHtmlCacheService,
  ) {}

  async execute({ publicId }: GetBlogHTMLContentUseCaseRequest): Promise<GetBlogHTMLContentUseCaseResponse> {
    const cachedBlogHtml = await this.blogHtmlCacheService.get(publicId)

    if (cachedBlogHtml) return { htmlContent: cachedBlogHtml }

    const blog = ensureExists({
      value: await this.blogsRepository.findByPublicId(publicId),
      error: new BlogNotFoundError(),
    })

    // NOTE: Por questões de segurança, emitir um erro genérico quando o
    // usuário não puder acessar um blog que ainda não foi publicado:
    if (blog.editorialStatus !== EditorialStatusType.PUBLISHED) {
      throw new BlogNotFoundError()
    }

    const blogProseMirror = blog.content as JSONContent

    const htmlContent = await this.rendererService.generateProseMirrorHtmlWeb(blogProseMirror, tiptapConfiguration)

    await this.blogHtmlCacheService.set(publicId, htmlContent)

    return { htmlContent }
  }
}
