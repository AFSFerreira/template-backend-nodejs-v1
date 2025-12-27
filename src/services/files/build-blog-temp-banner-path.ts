import path from 'node:path'
import { BLOG_TEMP_BANNERS_PATH } from '@constants/dynamic-file-constants'

export function buildBlogTempBannerPath(filename: string) {
  return path.resolve(BLOG_TEMP_BANNERS_PATH, filename)
}
