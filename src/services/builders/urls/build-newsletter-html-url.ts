import { getBackendBaseUrlStored } from '@lib/async-local-storage/helpers/get-backend-base-url-stored'
import urlJoin from 'url-join'

export function buildNewsletterHtmlUrl(publicId: string): string {
  const backendBaseUrl = getBackendBaseUrlStored()
  return urlJoin(backendBaseUrl, 'newsletters', publicId, 'content')
}
