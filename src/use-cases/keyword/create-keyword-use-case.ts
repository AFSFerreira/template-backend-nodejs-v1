import type { Keyword } from '@prisma/client'
import type { KeywordRepository } from '@/repositories/keyword-repository'

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
  }: CreateKeywordUseCaseRequest): Promise<CreateKeywordUseCaseResponse> {
    const keyword = await this.keywordRepository.create({
      value,
    })
    return { keyword }
  }
}
