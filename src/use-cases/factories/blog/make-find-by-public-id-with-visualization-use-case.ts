import { PrismaBlogsRepository } from '@repositories/prisma/prisma-blogs-repository'
import { FindByPublicIdWithVisualizationUseCase } from '@use-cases/blogs/find-by-public-id-with-visualization'

export function makeFindByPublicIdWithVisualizationUseCase() {
  const blogsRepository = new PrismaBlogsRepository()
  const findByPublicIdWithVisualizationUseCase = new FindByPublicIdWithVisualizationUseCase(blogsRepository)

  return findByPublicIdWithVisualizationUseCase
}
