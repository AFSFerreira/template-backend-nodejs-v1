import type {
  GetNewsletterContentUseCaseRequest,
  GetNewsletterContentUseCaseResponse,
} from '@custom-types/use-cases/newsletters/get-newsletter-content'
import type { NewslettersRepository } from '@repositories/newsletters-repository'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { buildNewsletterHtmlPath } from '@services/builders/paths/build-newsletter-html-path'
import { createFileReadStream } from '@utils/files/create-file-read-stream'
import { ensureExists } from '@utils/validators/ensure'
import { inject, injectable } from 'tsyringe'
import { NewsletterHtmlReadError } from '../errors/newsletter/newsletter-html-read-error'
import { NewsletterNotFoundError } from '../errors/newsletter/newsletter-not-found-error'

@injectable()
export class GetNewsletterContentUseCase {
  constructor(
    @inject(tsyringeTokens.repositories.newsletters)
    private readonly newslettersRepository: NewslettersRepository,
  ) {}

  async execute({ publicId }: GetNewsletterContentUseCaseRequest): Promise<GetNewsletterContentUseCaseResponse> {
    const newsletter = ensureExists({
      value: await this.newslettersRepository.findByPublicId(publicId),
      error: new NewsletterNotFoundError(),
    })

    const stream = ensureExists({
      value: await createFileReadStream(buildNewsletterHtmlPath(newsletter.content)),
      error: new NewsletterHtmlReadError(),
    })

    return { stream }
  }
}
