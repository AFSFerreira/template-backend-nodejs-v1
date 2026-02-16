import { STATIC_NEWSLETTER_HTML_ROUTE } from '@constants/static-routes-constants'
import { getBackendBaseUrlStored } from '@lib/logger/helpers/get-backend-base-url-stored'
import { buildShardFileFolder } from '@utils/files/build-shard-file-folder'
import urlJoin from 'url-join'

export function buildNewsletterHtmlUrl(filename: string): string {
  const backendBaseUrl = getBackendBaseUrlStored()
  return urlJoin(backendBaseUrl, STATIC_NEWSLETTER_HTML_ROUTE, buildShardFileFolder(filename), filename)
}
