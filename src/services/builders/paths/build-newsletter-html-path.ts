import path from 'node:path'
import { NEWSLETTER_TEMP_HTML_PATH } from '@constants/dynamic-file-constants'

export function buildNewsletterTempHtmlPath(filename: string) {
  return path.resolve(NEWSLETTER_TEMP_HTML_PATH, filename)
}
