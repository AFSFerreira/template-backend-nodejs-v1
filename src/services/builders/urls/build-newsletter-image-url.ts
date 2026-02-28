import { STATIC_NEWSLETTER_IMAGES_ROUTE, STATIC_TEMP_NEWSLETTER_IMAGES_ROUTE } from '@constants/static-routes-constants'
import { getBackendBaseUrlStored } from '@lib/pino/helpers/get-backend-base-url-stored'
import { buildShardFileFolder } from '@utils/files/build-shard-file-folder'
import urlJoin from 'url-join'

export function buildNewsletterTempImageUrl(filename: string): string {
  const backendBaseUrl = getBackendBaseUrlStored()
  return urlJoin(backendBaseUrl, STATIC_TEMP_NEWSLETTER_IMAGES_ROUTE, filename)
}

export function buildNewsletterImageUrl(filename: string): string {
  const backendBaseUrl = getBackendBaseUrlStored()
  return urlJoin(backendBaseUrl, STATIC_NEWSLETTER_IMAGES_ROUTE, buildShardFileFolder(filename), filename)
}
