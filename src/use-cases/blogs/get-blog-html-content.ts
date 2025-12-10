import type {
  GetBlogHTMLContentUseCaseRequest,
  GetBlogHTMLContentUseCaseResponse,
} from '@custom-types/use-cases/blogs/get-blog-html-content'
import type { BlogsRepository } from '@repositories/blogs-repository'
import type { JSONContent } from '@tiptap/core'
import { redis } from '@lib/redis'
import { tiptapConfiguration } from '@lib/tiptap/helpers/configuration'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import { getBlogHTMLCached, setBlogHTMLCache } from '@services/cache/blogs-html-cache'
import { generateHTML } from '@tiptap/html'
import { BlogNotFoundError } from '@use-cases/errors/blog/blog-not-found-error'
import { ensureExists } from '@utils/guards/ensure'
import { inject, injectable } from 'tsyringe'

@injectable()
export class GetBlogHTMLContentUseCase {
  constructor(
    @inject(tokens.repositories.blogs)
    private readonly blogsRepository: BlogsRepository,
  ) {}

  async execute({ publicId }: GetBlogHTMLContentUseCaseRequest): Promise<GetBlogHTMLContentUseCaseResponse> {
    const blog = ensureExists({
      value: await this.blogsRepository.findByPublicId(publicId),
      error: new BlogNotFoundError(),
    })

    const cachedBlogHtml = await getBlogHTMLCached({ blogId: blog.id, redis })

    if (cachedBlogHtml) return { htmlContent: cachedBlogHtml }

    const blogProseMirror = blog.content as JSONContent

    const htmlContent = generateHTML(blogProseMirror, tiptapConfiguration)

    await setBlogHTMLCache({ blogId: blog.id, htmlContent, redis })

    return { htmlContent }
  }
}
