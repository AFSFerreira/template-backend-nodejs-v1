import path from 'node:path'
import { BLOG_IMAGES_PATH, BLOG_TEMP_IMAGES_PATH } from '@constants/dynamic-file-constants'

export function buildBlogTempImagePath(filename: string) {
  return path.resolve(BLOG_TEMP_IMAGES_PATH, filename)
}

export function buildBlogImagePath(filename: string) {
  return path.resolve(BLOG_IMAGES_PATH, filename)
}
