import { STATIC_MEETING_AGENDAS_ROUTE, STATIC_MEETING_BANNERS_IMAGE_ROUTE } from '@constants/static-routes-constants'
import { getBackendBaseUrlStored } from '@lib/async-local-storage/helpers/get-backend-base-url-stored'
import { injectable } from 'tsyringe'
import urlJoin from 'url-join'

@injectable()
export class MeetingUrlBuilderService {
  buildBannerUrl(filename: string): string {
    const backendBaseUrl = getBackendBaseUrlStored()
    return urlJoin(backendBaseUrl, STATIC_MEETING_BANNERS_IMAGE_ROUTE, filename)
  }

  buildAgendaUrl(filename: string): string {
    const backendBaseUrl = getBackendBaseUrlStored()
    return urlJoin(backendBaseUrl, STATIC_MEETING_AGENDAS_ROUTE, filename)
  }
}
