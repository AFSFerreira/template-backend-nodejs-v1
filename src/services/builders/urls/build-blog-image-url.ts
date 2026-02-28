import { STATIC_BLOG_IMAGE_ROUTE, STATIC_TEMP_BLOG_BANNERS_IMAGE_ROUTE } from '@constants/static-routes-constants'
import { getBackendBaseUrlStored } from '@lib/pino/helpers/get-backend-base-url-stored'
import { buildShardFileFolder } from '@utils/files/build-shard-file-folder'
import urlJoin from 'url-join'

export function buildTempBlogImageUrl(filename: string): string {
  const backendBaseUrl = getBackendBaseUrlStored()
  return urlJoin(backendBaseUrl, STATIC_TEMP_BLOG_BANNERS_IMAGE_ROUTE, buildShardFileFolder(filename), filename)
}

export function buildBlogImageUrl(filename: string): string {
  const backendBaseUrl = getBackendBaseUrlStored()
  return urlJoin(backendBaseUrl, STATIC_BLOG_IMAGE_ROUTE, buildShardFileFolder(filename), filename)
}
