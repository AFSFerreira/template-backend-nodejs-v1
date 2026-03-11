import type { RenderOptions } from '@custom-types/services/renderers/base-renderer'
import type { NewsletterRendererInfo } from '@custom-types/services/renderers/newsletters/newsletter-template-renderer'
import type { RendererOutput } from '@custom-types/services/renderers/renderer-output'
import path from 'node:path'
import { NUNJUCKS_TEMPLATES_ROOT_PATH } from '@constants/dynamic-file-constants'
import { NEWSLETTER_BASE_TEMPLATE_FOLDER } from '@constants/static-file-constants'
import { DateFormatter } from '@utils/formatters/date-formatter'
import { injectable } from 'tsyringe'
import { BaseRenderer } from '../base-renderer'

@injectable()
export class NewsletterTemplateRenderer extends BaseRenderer<NewsletterRendererInfo> {
  protected htmlTemplatePath: string

  constructor(templateFolder?: string) {
    super()
    this.htmlTemplatePath = path.resolve(
      NUNJUCKS_TEMPLATES_ROOT_PATH,
      templateFolder ?? NEWSLETTER_BASE_TEMPLATE_FOLDER,
      'template.html.njk',
    )
    this.textTemplatePath = path.resolve(
      NUNJUCKS_TEMPLATES_ROOT_PATH,
      templateFolder ?? NEWSLETTER_BASE_TEMPLATE_FOLDER,
      'template.text.njk',
    )
  }

  async renderTemplate(
    templateFolder: string,
    input: NewsletterRendererInfo,
    options?: RenderOptions,
  ): Promise<RendererOutput> {
    this.htmlTemplatePath = path.resolve(NUNJUCKS_TEMPLATES_ROOT_PATH, templateFolder, 'template.html.njk')
    this.textTemplatePath = path.resolve(NUNJUCKS_TEMPLATES_ROOT_PATH, templateFolder, 'template.text.njk')

    return super.render(input, options)
  }

  protected mapPayload(input: NewsletterRendererInfo) {
    const { newsletterInfo, meetingInfo } = input

    const eventoPayload = meetingInfo
      ? {
          newsletter_event_title: meetingInfo.title,
          newsletter_event_location: meetingInfo.location,
          newsletter_event_dates: DateFormatter.formatGroupedDates(meetingInfo.dates),
        }
      : null

    return {
      ...eventoPayload,
      newsletter_body: newsletterInfo.htmlBody,
      newsletter_sequence_number: newsletterInfo.sequenceNumber,
      newsletter_edition_number: newsletterInfo.editionNumber,
      newsletter_volume: newsletterInfo.volume,
      newsletter_release_date: DateFormatter.formatFullDate(newsletterInfo.createdAt),
    }
  }
}
