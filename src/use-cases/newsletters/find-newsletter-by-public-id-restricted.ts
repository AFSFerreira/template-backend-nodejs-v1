import type {
  FindNewsletterByPublicIdRestrictedUseCaseRequest,
  FindNewsletterByPublicIdRestrictedUseCaseResponse,
} from '@custom-types/use-cases/newsletters/find-newsletter-by-public-id-restricted'
import type { NewslettersRepository } from '@repositories/newsletters-repository'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { NewsletterNotFoundError } from '@use-cases/errors/newsletter/newsletter-not-found-error'
import { ensureExists } from '@utils/validators/ensure'
import { inject, singleton } from 'tsyringe'

@singleton()
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
      newsletter,
    }
  }
}
