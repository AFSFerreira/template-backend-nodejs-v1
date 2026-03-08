import path from 'node:path'
import { NEWSLETTER_HTML_PATH, NEWSLETTER_TEMP_HTML_PATH } from '@constants/dynamic-file-constants'
import { buildShardFileFolder } from '@utils/files/build-shard-file-folder'

export function buildNewsletterTempHtmlPath(filename: string) {
  return path.resolve(NEWSLETTER_TEMP_HTML_PATH, filename)
}

export function buildNewsletterHtmlPath(filename: string) {
  return path.resolve(NEWSLETTER_HTML_PATH, buildShardFileFolder(filename), filename)
}
