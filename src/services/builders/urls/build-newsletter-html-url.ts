import { getBackendBaseUrlStored } from '@lib/pino/helpers/get-backend-base-url-stored'
import urlJoin from 'url-join'

export function buildNewsletterHtmlUrl(publicId: string): string {
  const backendBaseUrl = getBackendBaseUrlStored()
  return urlJoin(backendBaseUrl, 'newsletters', publicId, 'content')
}
