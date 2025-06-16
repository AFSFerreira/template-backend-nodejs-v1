import type { KeywordRepository } from '@/repositories/keyword-repository'
import type { Keyword } from '@prisma/client'

interface CreateKeywordUseCaseRequest {
  value: string
  userId: string
}

interface CreateKeywordUseCaseResponse {
  keyword: Keyword
}

export class CreateKeywordUseCase {
  constructor(private readonly keywordRepository: KeywordRepository) {}

  async execute({
    value,
    userId,
  }: CreateKeywordUseCaseRequest): Promise<CreateKeywordUseCaseResponse> {
    const keyword = await this.keywordRepository.create({
      value,
      userId,
    })
    return { keyword }
  }
}
