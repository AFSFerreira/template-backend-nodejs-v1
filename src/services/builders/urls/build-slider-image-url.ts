import { STATIC_SLIDER_IMAGES_ROUTE } from '@constants/static-routes-constants'
import { getBackendBaseUrl } from '@lib/logger/helpers/get-backend-base-url'
import urlJoin from 'url-join'

export function buildSliderImageUrl(filename: string, ...pathSegments: string[]): string {
  const backendBaseUrl = getBackendBaseUrl()
  return urlJoin(backendBaseUrl, STATIC_SLIDER_IMAGES_ROUTE, ...pathSegments, filename)
}
