import { logError } from '@lib/logger/helpers/log-error'
import { INVALID_URL_FALLBACK } from '@messages/loggings/file-loggings'
import path from 'path'

export function extractBaseFilenameFromLink(link: string): string | null {
  try {
    const urlObj = new URL(link)
    return path.posix.basename(urlObj.pathname)
  } catch (error) {
    logError({ error, message: INVALID_URL_FALLBACK })
    return null
  }
}
