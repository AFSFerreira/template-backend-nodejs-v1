import type { GetBlogsMetricsUseCaseResponse } from '@custom-types/use-cases/dashboard-metrics/get-blogs-metrics'
import type { BlogsRepository } from '@repositories/blogs-repository'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { EditorialStatusType } from '@prisma/client'
import { inject, injectable } from 'tsyringe'

@injectable()
export class GetBlogsMetricsUseCase {
  constructor(
    @inject(tsyringeTokens.repositories.blogs)
    private readonly blogsRepository: BlogsRepository,
  ) {}

  async execute(): Promise<GetBlogsMetricsUseCaseResponse> {
    const totalBlogs = await this.blogsRepository.totalCount({ editorialStatus: EditorialStatusType.PUBLISHED })

    return {
      totalBlogs,
    }
  }
}
