import type {
  FindNewsletterByPublicIdUseCaseRequest,
  FindNewsletterByPublicIdUseCaseResponse,
} from '@custom-types/use-cases/newsletters/find-newsletter-by-public-id'
import type { NewslettersRepository } from '@repositories/newsletters-repository'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { ensureExists } from '@utils/validators/ensure'
import { inject, singleton } from 'tsyringe'
import { NewsletterNotFoundError } from '../errors/newsletter/newsletter-not-found-error'

@singleton()
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
      newsletter,
    }
  }
}
