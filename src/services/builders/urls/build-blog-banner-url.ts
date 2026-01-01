import { STATIC_BLOG_BANNERS_IMAGE_ROUTE } from '@constants/static-routes-constants'
import { getBackendBaseUrl } from '@lib/logger/helpers/get-backend-base-url'
import { buildShardFileFolder } from '@utils/files/build-shard-file-folder'
import urlJoin from 'url-join'

export function buildBlogBannerUrl(filename: string): string {
  const backendBaseUrl = getBackendBaseUrl()
  return urlJoin(backendBaseUrl, STATIC_BLOG_BANNERS_IMAGE_ROUTE, buildShardFileFolder(filename), filename)
}
