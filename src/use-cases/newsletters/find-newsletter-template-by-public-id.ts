import type {
  FindNewsletterTemplateByPublicIdUseCaseRequest,
  FindNewsletterTemplateByPublicIdUseCaseResponse,
} from '@custom-types/use-cases/newsletters/find-newsletter-template-by-public-id'
import type { NewsletterTemplatesRepository } from '@repositories/newsletter-templates-repository'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { ensureExists } from '@utils/validators/ensure'
import { inject, injectable } from 'tsyringe'
import { NewsletterTemplateNotFoundError } from '../errors/newsletter/newsletter-template-not-found-error'

@injectable()
export class FindNewsletterTemplateByPublicIdUseCase {
  constructor(
    @inject(tsyringeTokens.repositories.newsletterTemplates)
    private readonly newsletterTemplatesRepository: NewsletterTemplatesRepository,
  ) {}

  async execute({
    publicId,
  }: FindNewsletterTemplateByPublicIdUseCaseRequest): Promise<FindNewsletterTemplateByPublicIdUseCaseResponse> {
    const newsletterTemplate = ensureExists({
      value: await this.newsletterTemplatesRepository.findByPublicId(publicId),
      error: new NewsletterTemplateNotFoundError(),
    })

    return { newsletterTemplate }
  }
}
