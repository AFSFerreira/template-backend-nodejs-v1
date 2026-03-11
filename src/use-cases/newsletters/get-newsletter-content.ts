import type {
  GetNewsletterHtmlContentUseCaseRequest,
  GetNewsletterHtmlContentUseCaseResponse,
} from '@custom-types/use-cases/newsletters/get-newsletter-content'
import type { NewslettersRepository } from '@repositories/newsletters-repository'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { NewsletterHtmlCacheService } from '@services/caches/newsletters-html-cache'
import { NewsletterContentRenderService } from '@services/renderers/newsletters/newsletter-content-render-service'
import { ensureExists } from '@utils/validators/ensure'
import { inject, singleton } from 'tsyringe'
import { NewsletterNotFoundError } from '../errors/newsletter/newsletter-not-found-error'

@singleton()
export class GetNewsletterHtmlContentUseCase {
  constructor(
    @inject(tsyringeTokens.repositories.newsletters)
    private readonly newslettersRepository: NewslettersRepository,

    @inject(NewsletterHtmlCacheService)
    private readonly newsletterHtmlCacheService: NewsletterHtmlCacheService,

    @inject(NewsletterContentRenderService)
    private readonly newsletterContentRenderService: NewsletterContentRenderService,
  ) {}

  async execute({
    publicId,
  }: GetNewsletterHtmlContentUseCaseRequest): Promise<GetNewsletterHtmlContentUseCaseResponse> {
    const cachedHtml = await this.newsletterHtmlCacheService.get(publicId)

    if (cachedHtml) return { content: cachedHtml }

    const newsletter = ensureExists({
      value: await this.newslettersRepository.findByPublicId(publicId),
      error: new NewsletterNotFoundError(),
    })

    const { html } = await this.newsletterContentRenderService.render(newsletter, 'web')

    await this.newsletterHtmlCacheService.set(publicId, html)

    return { content: html }
  }
}
