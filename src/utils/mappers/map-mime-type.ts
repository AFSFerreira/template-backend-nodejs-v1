import { EXTENSION_TO_MIME_MAP, MIME_TO_EXTENSION_MAP } from '@constants/maps'

export function mapMimeTypeToExtension(mimeType: string) {
  const cleanMime = mimeType.split(';')[0].trim().toLowerCase()

  const extension = MIME_TO_EXTENSION_MAP.get(cleanMime)

  return extension
}

export function mapExtensionToMimeType(extension: string) {
  const mimeType = EXTENSION_TO_MIME_MAP.get(extension)

  return mimeType
}
