import {
  STATIC_INSTITUTIONAL_ABOUT_IMAGE_ROUTE,
  STATIC_TEMP_INSTITUTIONAL_ABOUT_IMAGE_ROUTE,
} from '@constants/static-routes-constants'
import { getBackendBaseUrl } from '@lib/logger/helpers/get-backend-base-url'
import { buildShardFileFolder } from '@utils/files/build-shard-file-folder'
import urlJoin from 'url-join'

export function buildTempInstitutionalAboutImageUrl(filename: string): string {
  const backendBaseUrl = getBackendBaseUrl()
  return urlJoin(backendBaseUrl, STATIC_TEMP_INSTITUTIONAL_ABOUT_IMAGE_ROUTE, filename)
}

export function buildInstitutionalAboutImageUrl(filename: string): string {
  const backendBaseUrl = getBackendBaseUrl()
  return urlJoin(backendBaseUrl, STATIC_INSTITUTIONAL_ABOUT_IMAGE_ROUTE, buildShardFileFolder(filename), filename)
}
