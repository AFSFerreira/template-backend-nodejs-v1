import { STATIC_INSTITUTIONAL_INFO_DOCUMENTS_ROUTE } from '@constants/static-routes-constants'
import { getBackendBaseUrl } from '@lib/logger/helpers/get-backend-base-url'
import urlJoin from 'url-join'

export function buildStatuteUrl(filename: string): string {
  const backendBaseUrl = getBackendBaseUrl()
  return urlJoin(backendBaseUrl, STATIC_INSTITUTIONAL_INFO_DOCUMENTS_ROUTE, filename)
}
