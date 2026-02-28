import type { Environment } from 'nunjucks'
import { NUNJUCKS_TEMPLATES_ROOT_PATH } from '@constants/dynamic-file-constants'
import { IS_DEV } from '@constants/env-constants'
import nunjucks from 'nunjucks'

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
  templatePath: string
  newsletterInfo: NewsletterInfo
  meetingInfo: MeetingInfo
}

interface MappedRenderNewsletterInfo {
  newsletter_body: string
  newsletter_sequence_number: string | number
  newsletter_volume: string | number
  newsletter_edition_number: string | number
  newsletter_release_date: string // Data escrita por extenso
}

interface MappedNewsletterEventInfo {
  newsletter_event_title: string
  newsletter_event_dates: string // Datas escritas por extenso
  newsletter_event_location: string
}

export class NewsletterRenderer {
  private static env: Environment = nunjucks.configure(NUNJUCKS_TEMPLATES_ROOT_PATH, {
    autoescape: true,
    noCache: IS_DEV,
    throwOnUndefined: true,
    trimBlocks: true,
    lstripBlocks: true,
  })

  private static mapNewsletterInfo(input: NewsletterInfo): MappedRenderNewsletterInfo {
    return {
      newsletter_body: input.htmlBody,

      // TODO: MELHORAR ESSA DATA
      newsletter_release_date: input.createdAt.toString(),

      newsletter_sequence_number: input.sequenceNumber,
      newsletter_edition_number: input.editionNumber,
      newsletter_volume: input.volume,
    }
  }

  private static mapMeetingInfo(input: MeetingInfo): MappedNewsletterEventInfo {
    return {
      // TODO: MELHORAR ESSAS DATAS
      newsletter_event_dates: input.dates.toString(),

      newsletter_event_location: input.location,
      newsletter_event_title: input.title,
    }
  }

  public static render(input: NewsletterRendererInfo) {
    const mappedNewsletterInfo = NewsletterRenderer.mapNewsletterInfo(input.newsletterInfo)

    const mappedMeetingInfo = NewsletterRenderer.mapMeetingInfo(input.meetingInfo)

    return NewsletterRenderer.env.render(input.templatePath, {
      ...mappedNewsletterInfo,
      ...mappedMeetingInfo,
    })
  }
}
