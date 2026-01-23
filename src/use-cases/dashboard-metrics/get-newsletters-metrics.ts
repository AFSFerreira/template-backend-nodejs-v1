import type { GetNewslettersMetricsUseCaseResponse } from '@custom-types/use-cases/dashboard-metrics/get-newsletters-metrics'
import type { NewslettersRepository } from '@repositories/newsletters-repository'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { inject, injectable } from 'tsyringe'

@injectable()
export class GetNewslettersMetricsUseCase {
  constructor(
    @inject(tsyringeTokens.repositories.newsletters)
    private readonly newslettersRepository: NewslettersRepository,
  ) {}

  async execute(): Promise<GetNewslettersMetricsUseCaseResponse> {
    const totalNewsletters = await this.newslettersRepository.totalCount()

    return {
      totalNewsletters,
    }
  }
}
