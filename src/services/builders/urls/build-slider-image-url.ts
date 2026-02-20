import { STATIC_SLIDER_IMAGES_ROUTE } from '@constants/static-routes-constants'
import { getBackendBaseUrlStored } from '@lib/pino/helpers/get-backend-base-url-stored'
import urlJoin from 'url-join'

export function buildSliderImageUrl(filename: string, ...pathSegments: string[]): string {
  const backendBaseUrl = getBackendBaseUrlStored()
  return urlJoin(backendBaseUrl, STATIC_SLIDER_IMAGES_ROUTE, ...pathSegments, filename)
}
