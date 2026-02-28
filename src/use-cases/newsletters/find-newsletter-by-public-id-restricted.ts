import type {
  FindNewsletterByPublicIdRestrictedUseCaseRequest,
  FindNewsletterByPublicIdRestrictedUseCaseResponse,
} from '@custom-types/use-cases/newsletters/find-newsletter-by-public-id-restricted'
import type { NewslettersRepository } from '@repositories/newsletters-repository'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { buildNewsletterHtmlUrl } from '@services/builders/urls/build-newsletter-html-url'
import { NewsletterNotFoundError } from '@use-cases/errors/newsletter/newsletter-not-found-error'
import { ensureExists } from '@utils/validators/ensure'
import { inject, injectable } from 'tsyringe'

@injectable()
export class FindNewsletterByPublicIdRestrictedUseCase {
  constructor(
    @inject(tsyringeTokens.repositories.newsletters)
    private readonly newslettersRepository: NewslettersRepository,
  ) {}

  async execute({
    publicId,
  }: FindNewsletterByPublicIdRestrictedUseCaseRequest): Promise<FindNewsletterByPublicIdRestrictedUseCaseResponse> {
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
