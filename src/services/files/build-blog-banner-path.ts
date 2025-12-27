import path from 'node:path'
import { BLOG_BANNERS_PATH } from '@constants/dynamic-file-constants'

export function buildBlogBannerPath(filename: string) {
  return path.resolve(BLOG_BANNERS_PATH, filename)
}
