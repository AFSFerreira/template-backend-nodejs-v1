import { PrismaBlogsRepository } from '@repositories/prisma/prisma-blogs-repository'
import { FindBlogByPublicIdUseCase } from '@use-cases/blogs/find-blog-by-public-id'

export function makeFindBlogByPublicIdUseCase() {
  const blogsRepository = new PrismaBlogsRepository()
  const findBlogByPublicIdUseCase = new FindBlogByPublicIdUseCase(blogsRepository)

  return findBlogByPublicIdUseCase
}
