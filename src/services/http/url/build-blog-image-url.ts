import { STATIC_BLOG_IMAGE_ROUTE } from '@constants/static-routes-constants'
import { getBackendBaseUrl } from '@lib/logger/helpers/get-backend-base-url'
import urlJoin from 'url-join'

export function buildBlogImageUrl(filename: string): string {
  const backendBaseUrl = getBackendBaseUrl()
  return urlJoin(backendBaseUrl, STATIC_BLOG_IMAGE_ROUTE, filename)
}
