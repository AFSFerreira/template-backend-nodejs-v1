import { STATIC_NEWSLETTER_HTML_ROUTE } from '@constants/static-routes-constants'
import { getBackendBaseUrl } from '@lib/logger/helpers/get-backend-base-url'
import { buildShardFileFolder } from '@utils/files/build-shard-file-folder'
import urlJoin from 'url-join'

export function buildNewsletterHtmlUrl(filename: string): string {
  const backendBaseUrl = getBackendBaseUrl()
  return urlJoin(backendBaseUrl, STATIC_NEWSLETTER_HTML_ROUTE, buildShardFileFolder(filename), filename)
}
