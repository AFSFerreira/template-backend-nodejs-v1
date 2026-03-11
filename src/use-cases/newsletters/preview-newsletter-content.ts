import type {
  PreviewNewsletterContentUseCaseRequest,
  PreviewNewsletterContentUseCaseResponse,
} from '@custom-types/use-cases/newsletters/preview-newsletter-content'
import type { MeetingsRepository } from '@repositories/meetings-repository'
import type { NewsletterTemplatesRepository } from '@repositories/newsletter-templates-repository'
import type { JSONContent } from '@tiptap/core'
import { tiptapConfiguration } from '@lib/tiptap/helpers/configuration'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { TipTapRendererService } from '@services/formatters/generate-prose-mirror-html'
import { NewsletterTemplateRenderer } from '@services/renderers/newsletters/newsletter-template-renderer'
import { ensureExists } from '@utils/validators/ensure'
import { inject, injectable } from 'tsyringe'
import { NewsletterTemplateNotFoundError } from '../errors/newsletter/newsletter-template-not-found-error'

@injectable()
export class PreviewNewsletterContentUseCase {
  constructor(
    @inject(tsyringeTokens.repositories.newsletterTemplates)
    private readonly newsletterTemplatesRepository: NewsletterTemplatesRepository,

    @inject(tsyringeTokens.repositories.meetings)
    private readonly meetingsRepository: MeetingsRepository,

    @inject(TipTapRendererService)
    private readonly tipTapRendererService: TipTapRendererService,

    @inject(NewsletterTemplateRenderer)
    private readonly newsletterTemplateRenderer: NewsletterTemplateRenderer,
  ) {}

  async execute({
    editionNumber,
    sequenceNumber,
    volume,
    proseContent,
    templateId,
  }: PreviewNewsletterContentUseCaseRequest): Promise<PreviewNewsletterContentUseCaseResponse> {
    const template = ensureExists({
      value: await this.newsletterTemplatesRepository.findByPublicId(templateId),
      error: new NewsletterTemplateNotFoundError(),
    })

    const bodyContent = await this.tipTapRendererService.generateProseMirrorHtmlWeb(
      proseContent as JSONContent,
      tiptapConfiguration,
    )

    const activeMeeting = await this.meetingsRepository.findActiveMeeting()

    const { html } = await this.newsletterTemplateRenderer.renderTemplate(
      template.templateFolder,
      {
        newsletterInfo: {
          htmlBody: bodyContent,
          createdAt: new Date(),
          editionNumber,
          sequenceNumber,
          volume,
        },
        meetingInfo: activeMeeting
          ? {
              title: activeMeeting.title,
              location: activeMeeting.location,
              dates: activeMeeting.MeetingDate.map((meetingDate) => meetingDate.date),
            }
          : undefined,
      },
      { minify: 'web' },
    )

    return { html }
  }
}
