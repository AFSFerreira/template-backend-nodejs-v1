import type {
  NewsletterRenderTarget,
  NewsletterRenderedContent,
} from '@custom-types/services/renderers/newsletters/newsletter-content-render-service'
import type { NewsletterWithDetails } from '@custom-types/validators/newsletter-with-details'
import type { MeetingsRepository } from '@repositories/meetings-repository'
import type { JSONContent } from '@tiptap/core'
import { UnreachableCaseError } from '@errors/unreachable-case-error'
import { tiptapConfiguration } from '@lib/tiptap/helpers/configuration'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { NewsletterFormatType } from '@prisma/generated/enums'
import { readFile } from '@services/files/read-file'
import { TipTapRendererService } from '@services/formatters/generate-prose-mirror-html'
import { HtmlOptimizationService } from '@services/formatters/html-optimization'
import { InvalidNewsletterContentError } from '@use-cases/errors/newsletter/invalid-newsletter-content-error'
import { NewsletterHtmlReadError } from '@use-cases/errors/newsletter/newsletter-html-read-error'
import { NewsletterTemplateNotConfiguredError } from '@use-cases/errors/newsletter/newsletter-template-not-configured-error'
import { buildNewsletterHtmlPath } from '@utils/builders/paths/build-newsletter-html-path'
import { PlainTextService } from '@utils/formatters/plain-text-service'
import { ensureExists } from '@utils/validators/ensure'
import { inject, injectable } from 'tsyringe'
import { NewsletterTemplateRenderer } from './newsletter-template-renderer'

@injectable()
export class NewsletterContentRenderService {
  constructor(
    @inject(tsyringeTokens.repositories.meetings)
    private readonly meetingsRepository: MeetingsRepository,

    @inject(TipTapRendererService)
    private readonly tipTapRendererService: TipTapRendererService,

    @inject(NewsletterTemplateRenderer)
    private readonly newsletterTemplateRenderer: NewsletterTemplateRenderer,
  ) {}

  async render(newsletter: NewsletterWithDetails, target: NewsletterRenderTarget): Promise<NewsletterRenderedContent> {
    switch (newsletter.format) {
      case NewsletterFormatType.PROSEMIRROR: {
        return this.renderProseMirror(newsletter, target)
      }

      case NewsletterFormatType.HTML_FILE: {
        return this.renderHtmlFile(newsletter, target)
      }

      default: {
        throw new UnreachableCaseError(newsletter.format satisfies never)
      }
    }
  }

  private async renderProseMirror(
    newsletter: NewsletterWithDetails,
    target: NewsletterRenderTarget,
  ): Promise<NewsletterRenderedContent> {
    const proseContent = ensureExists({
      value: newsletter.proseContent,
      error: new InvalidNewsletterContentError(),
    })

    if (!newsletter.newsletterTemplateId || !newsletter.NewsletterTemplate) {
      throw new NewsletterTemplateNotConfiguredError()
    }

    let bodyContent: string | undefined

    switch (target) {
      case 'email': {
        bodyContent = await this.tipTapRendererService.generateProseMirrorHtmlEmail(
          proseContent as JSONContent,
          tiptapConfiguration,
        )
        break
      }

      case 'web': {
        bodyContent = await this.tipTapRendererService.generateProseMirrorHtmlWeb(
          proseContent as JSONContent,
          tiptapConfiguration,
        )
        break
      }

      default: {
        throw new UnreachableCaseError(target satisfies never)
      }
    }

    const activeMeeting = await this.meetingsRepository.findActiveMeeting()

    const rendered = await this.newsletterTemplateRenderer.renderTemplate(
      newsletter.NewsletterTemplate.templateFolder,
      {
        newsletterInfo: {
          htmlBody: bodyContent,
          createdAt: newsletter.createdAt,
          editionNumber: newsletter.editionNumber,
          sequenceNumber: newsletter.sequenceNumber,
          volume: newsletter.volume,
        },
        meetingInfo: activeMeeting
          ? {
              title: activeMeeting.title,
              location: activeMeeting.location,
              dates: activeMeeting.MeetingDate.map((meetingDate) => meetingDate.date),
            }
          : undefined,
      },
      { minify: target },
    )

    return { html: rendered.html, text: rendered.text }
  }

  private async renderHtmlFile(
    newsletter: NewsletterWithDetails,
    target: NewsletterRenderTarget,
  ): Promise<NewsletterRenderedContent> {
    const fileContent = ensureExists({
      value: newsletter.fileContent,
      error: new NewsletterHtmlReadError(),
    })

    let html = ensureExists({
      value: await readFile(buildNewsletterHtmlPath(fileContent)),
      error: new NewsletterHtmlReadError(),
    })

    switch (target) {
      case 'email': {
        html = await HtmlOptimizationService.minifyForEmail(html)
        break
      }

      case 'web': {
        html = await HtmlOptimizationService.minifyForWeb(html)
        break
      }

      default: {
        throw new UnreachableCaseError(target satisfies never)
      }
    }

    const text = PlainTextService.fromHtml(html)

    return { html, text }
  }
}
