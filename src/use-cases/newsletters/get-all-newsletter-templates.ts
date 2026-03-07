import type {
  GetAllNewsletterTemplatesUseCaseRequest,
  GetAllNewsletterTemplatesUseCaseResponse,
} from '@custom-types/use-cases/newsletters/get-all-newsletter-templates'
import type { NewsletterTemplatesRepository } from '@repositories/newsletter-templates-repository'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { inject, injectable } from 'tsyringe'

@injectable()
export class GetAllNewsletterTemplatesUseCase {
  constructor(
    @inject(tsyringeTokens.repositories.newsletterTemplates)
    private readonly newsletterTemplatesRepository: NewsletterTemplatesRepository,
  ) {}

  async execute(query: GetAllNewsletterTemplatesUseCaseRequest): Promise<GetAllNewsletterTemplatesUseCaseResponse> {
    const templatesInfo = await this.newsletterTemplatesRepository.listAll(query)

    return templatesInfo
  }
}
