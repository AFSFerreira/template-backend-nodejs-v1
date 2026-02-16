import { STATIC_INSTITUTIONAL_INFO_DOCUMENTS_ROUTE } from '@constants/static-routes-constants'
import { getBackendBaseUrlStored } from '@lib/logger/helpers/get-backend-base-url-stored'
import urlJoin from 'url-join'

export function buildElectionNoticeUrl(filename: string): string {
  const backendBaseUrl = getBackendBaseUrlStored()
  return urlJoin(backendBaseUrl, STATIC_INSTITUTIONAL_INFO_DOCUMENTS_ROUTE, filename)
}
