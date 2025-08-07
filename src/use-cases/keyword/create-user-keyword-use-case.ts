import { KeywordType, type Keyword } from '@prisma/client'
import type { KeywordRepository } from '@/repositories/keyword-repository'

interface CreateUserKeywordUseCaseRequest {
  value: string
}

interface CreateUserKeywordUseCaseResponse {
  keyword: Keyword
}

export class CreateUserKeywordUseCase {
  constructor(private readonly keywordRepository: KeywordRepository) {}

  async execute({
    value,
  }: CreateUserKeywordUseCaseRequest): Promise<CreateUserKeywordUseCaseResponse> {
    const keyword = await this.keywordRepository.create({
      value,
      type: KeywordType.USER_INTEREST,
    })
    return { keyword }
  }
}
