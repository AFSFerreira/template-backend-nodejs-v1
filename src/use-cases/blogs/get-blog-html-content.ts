import { redis } from '@lib/redis'
import { tiptapConfiguration } from "@lib/tiptap/helpers/configuration"
import type { BlogsRepository } from "@repositories/blogs-repository"
import type { GetBlogHtmlContentParamsSchemaType } from "@schemas/blog/get-blog-html-content-params-schema"
import { getBlogHTMLCached, setBlogHTMLCache } from "@services/blogs-html-cache"
import type { JSONContent } from "@tiptap/core"
import { generateHTML } from "@tiptap/html"
import { BlogNotFoundError } from "@use-cases/errors/blog/blog-not-found-error"
import { ensureExists } from "@utils/ensure"

interface GetBlogHTMLContentUseCaseRequest extends GetBlogHtmlContentParamsSchemaType {}

interface GetBlogHTMLContentUseCaseResponse {
  htmlContent: string
}

export class GetBlogHTMLContentUseCase {
  constructor(private readonly blogsRepository: BlogsRepository) {}

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
