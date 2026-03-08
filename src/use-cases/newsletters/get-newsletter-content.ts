import type {
  GetNewsletterHtmlContentUseCaseRequest,
  GetNewsletterHtmlContentUseCaseResponse,
} from '@custom-types/use-cases/newsletters/get-newsletter-content'
import type { MeetingsRepository } from '@repositories/meetings-repository'
import type { NewslettersRepository } from '@repositories/newsletters-repository'
import { redis } from '@lib/redis'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { getNewsletterHTMLCached, setNewsletterHTMLCache } from '@services/cache/newsletters-html-cache'
import { NewsletterContentRenderService } from '@services/renderers/newsletters/newsletter-content-render-service'
import { ensureExists } from '@utils/validators/ensure'
import { inject, injectable } from 'tsyringe'
import { NewsletterNotFoundError } from '../errors/newsletter/newsletter-not-found-error'

@injectable()
export class GetNewsletterHtmlContentUseCase {
  constructor(
    @inject(tsyringeTokens.repositories.newsletters)
    private readonly newslettersRepository: NewslettersRepository,

    @inject(tsyringeTokens.repositories.meetings)
    private readonly meetingsRepository: MeetingsRepository,
  ) {}

  async execute({
    publicId,
  }: GetNewsletterHtmlContentUseCaseRequest): Promise<GetNewsletterHtmlContentUseCaseResponse> {
    const cachedHtml = await getNewsletterHTMLCached({ publicId, redis })

    if (cachedHtml) return { content: cachedHtml }

    const newsletter = ensureExists({
      value: await this.newslettersRepository.findByPublicId(publicId),
      error: new NewsletterNotFoundError(),
    })

    const { html } = await new NewsletterContentRenderService(this.meetingsRepository).render(newsletter, 'web')

    await setNewsletterHTMLCache({ publicId, htmlContent: html, redis })

    return { content: html }
  }
}
