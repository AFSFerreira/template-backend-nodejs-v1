import path from 'node:path'
import { NEWSLETTER_IMAGES_PATH, NEWSLETTER_TEMP_IMAGES_PATH } from '@constants/dynamic-file-constants'
import { buildShardFileFolder } from '@utils/files/build-shard-file-folder'

export function buildNewsletterTempImagePath(filename: string) {
  return path.resolve(NEWSLETTER_TEMP_IMAGES_PATH, filename)
}

export function buildNewsletterImagePath(filename: string) {
  return path.resolve(NEWSLETTER_IMAGES_PATH, buildShardFileFolder(filename), filename)
}
