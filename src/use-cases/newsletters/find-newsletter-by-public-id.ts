import type {
  FindNewsletterByPublicIdUseCaseRequest,
  FindNewsletterByPublicIdUseCaseResponse,
} from '@custom-types/use-cases/newsletters/find-newsletter-by-public-id'
import type { NewslettersRepository } from '@repositories/newsletters-repository'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { buildNewsletterHtmlUrl } from '@services/builders/urls/build-newsletter-html-url'
import { ensureExists } from '@utils/validators/ensure'
import { inject, injectable } from 'tsyringe'
import { NewsletterNotFoundError } from '../errors/newsletter/newsletter-not-found-error'

@injectable()
export class FindNewsletterByPublicIdUseCase {
  constructor(
    @inject(tsyringeTokens.repositories.newsletters)
    private readonly newslettersRepository: NewslettersRepository,
  ) {}

  async execute({
    publicId,
  }: FindNewsletterByPublicIdUseCaseRequest): Promise<FindNewsletterByPublicIdUseCaseResponse> {
    const newsletter = ensureExists({
      value: await this.newslettersRepository.findByPublicId(publicId),
      error: new NewsletterNotFoundError(),
    })

    return {
      newsletter: {
        ...newsletter,
        contentUrl: buildNewsletterHtmlUrl(newsletter.publicId),
      },
    }
  }
}
