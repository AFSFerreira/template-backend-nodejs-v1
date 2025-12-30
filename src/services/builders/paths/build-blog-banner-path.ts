import path from 'node:path'
import { BLOG_BANNERS_PATH, BLOG_TEMP_BANNERS_PATH } from '@constants/dynamic-file-constants'
import { buildShardFileFolder } from '@utils/files/build-shard-file-folder'

export function buildBlogTempBannerPath(filename: string) {
  return path.resolve(BLOG_TEMP_BANNERS_PATH, filename)
}

export function buildBlogBannerPath(filename: string) {
  return path.resolve(BLOG_BANNERS_PATH, buildShardFileFolder(filename), filename)
}
