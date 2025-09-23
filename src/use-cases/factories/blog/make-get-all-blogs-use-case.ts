import { PrismaBlogsRepository } from '@repositories/prisma/prisma-blogs-repository'
import { GetAllBlogsUseCase } from '@use-cases/blogs/get-all-blogs'

export function makeGetAllBlogsUseCase() {
  const blogsRepository = new PrismaBlogsRepository()
  const getAllBogsUseCase = new GetAllBlogsUseCase(blogsRepository)

  return getAllBogsUseCase
}
