import type {
  GetAllNewslettersUseCaseRequest,
  GetAllNewslettersUseCaseResponse,
} from '@custom-types/use-cases/newsletters/get-all-newsletters'
import type { NewslettersRepository } from '@repositories/newsletters-repository'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { inject, singleton } from 'tsyringe'

@singleton()
export class GetAllNewslettersUseCase {
  constructor(
    @inject(tsyringeTokens.repositories.newsletters)
    private readonly newslettersRepository: NewslettersRepository,
  ) {}

  async execute(query: GetAllNewslettersUseCaseRequest): Promise<GetAllNewslettersUseCaseResponse> {
    const newslettersInfo = await this.newslettersRepository.listAll(query)

    return newslettersInfo
  }
}
