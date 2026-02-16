import {
  STATIC_INSTITUTIONAL_INFO_DOCUMENTS_ROUTE,
  STATIC_TEMP_INSTITUTIONAL_ABOUT_IMAGE_ROUTE,
} from '@constants/static-routes-constants'
import { getBackendBaseUrlStored } from '@lib/logger/helpers/get-backend-base-url-stored'
import urlJoin from 'url-join'

export function buildTempInstitutionalAboutImageUrl(filename: string): string {
  const backendBaseUrl = getBackendBaseUrlStored()
  return urlJoin(backendBaseUrl, STATIC_TEMP_INSTITUTIONAL_ABOUT_IMAGE_ROUTE, filename)
}

export function buildInstitutionalAboutImageUrl(filename: string): string {
  const backendBaseUrl = getBackendBaseUrlStored()
  return urlJoin(backendBaseUrl, STATIC_INSTITUTIONAL_INFO_DOCUMENTS_ROUTE, filename)
}
