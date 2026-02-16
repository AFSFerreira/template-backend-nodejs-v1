import { STATIC_MEETING_BANNERS_IMAGE_ROUTE } from '@constants/static-routes-constants'
import { getBackendBaseUrlStored } from '@lib/logger/helpers/get-backend-base-url-stored'
import urlJoin from 'url-join'

export function buildMeetingBannerUrl(filename: string): string {
  const backendBaseUrl = getBackendBaseUrlStored()
  return urlJoin(backendBaseUrl, STATIC_MEETING_BANNERS_IMAGE_ROUTE, filename)
}
