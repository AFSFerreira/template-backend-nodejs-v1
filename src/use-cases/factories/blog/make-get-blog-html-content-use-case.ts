import { PrismaBlogsRepository } from "@repositories/prisma/prisma-blogs-repository"
import { GetBlogHTMLContentUseCase } from "@use-cases/blogs/get-blog-html-content"

export function makeGetBlogHtmlContentUseCase() {
  const blogsRepository = new PrismaBlogsRepository()
  const getBlogHTMLContentUseCase = new GetBlogHTMLContentUseCase(blogsRepository)

  return getBlogHTMLContentUseCase
}
