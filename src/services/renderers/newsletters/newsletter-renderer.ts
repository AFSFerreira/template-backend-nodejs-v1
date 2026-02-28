import path from 'node:path'
import { NUNJUCKS_TEMPLATES_ROOT_PATH } from '@constants/dynamic-file-constants'
import { NEWSLETTER_TEMPLATE } from '@constants/static-file-constants'
import { DateFormatter } from '@utils/formatters/date-formatter'
import { BaseRenderer } from '../base-renderer'

interface NewsletterInfo {
  htmlBody: string
  sequenceNumber: string
  editionNumber: string
  volume: string
  createdAt: Date
}

interface MeetingInfo {
  title: string
  location: string
  dates: Date[]
}

interface NewsletterRendererInfo {
  newsletterInfo: NewsletterInfo
  meetingInfo?: MeetingInfo
}

export class NewsletterRenderer extends BaseRenderer<NewsletterRendererInfo> {
  protected readonly htmlTemplatePath = path.resolve(NUNJUCKS_TEMPLATES_ROOT_PATH, NEWSLETTER_TEMPLATE)

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
