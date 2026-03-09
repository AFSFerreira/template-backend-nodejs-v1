import type { NewsletterRendererInfo } from '@custom-types/services/renderers/newsletters/newsletter-template-renderer'
import path from 'node:path'
import { NUNJUCKS_TEMPLATES_ROOT_PATH } from '@constants/dynamic-file-constants'
import { DateFormatter } from '@utils/formatters/date-formatter'
import { BaseRenderer } from '../base-renderer'

/**
 * Renderizador de templates de newsletter baseado em Nunjucks.
 *
 * Estende {@link BaseRenderer} para mapear dados da newsletter (edição,
 * volume, datas) e opcionalmente dados de encontro científico ativo
 * no formato esperado pelos templates `template.html.njk` e `template.text.njk`.
 */
export class NewsletterTemplateRenderer extends BaseRenderer<NewsletterRendererInfo> {
  protected readonly htmlTemplatePath: string
  protected readonly textTemplatePath: string

  constructor(templateFolder: string) {
    super()
    this.htmlTemplatePath = path.resolve(NUNJUCKS_TEMPLATES_ROOT_PATH, templateFolder, 'template.html.njk')
    this.textTemplatePath = path.resolve(NUNJUCKS_TEMPLATES_ROOT_PATH, templateFolder, 'template.text.njk')
  }

  protected mapPayload(input: NewsletterRendererInfo) {
    const { newsletterInfo, meetingInfo } = input

    // Se a reunião não existir, mandamos null para o template não renderizar o bloco:
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
