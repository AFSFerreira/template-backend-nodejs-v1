import { PUBLIC_DOCUMENTS_PATH } from '@constants/dynamic-file-constants'
import { getBackendBaseUrl } from '@lib/logger/helpers/get-backend-base-url'
import urlJoin from 'url-join'

export function buildStatuteUrl(filename: string): string {
  const backendBaseUrl = getBackendBaseUrl()
  return urlJoin(backendBaseUrl, PUBLIC_DOCUMENTS_PATH, filename)
}
