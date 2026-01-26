import { extractBaseFilenameFromLink } from '@utils/extractors/extract-base-filename-from-link'
import { isValidUrl } from '@utils/validators/is-valid-url'

export function sanitizeUrlFilename(input: string | undefined) {
  if (!input) return null
  return isValidUrl(input) ? extractBaseFilenameFromLink(input) : input
}
