import { EXTENSION_TO_MIME_MAP, MIME_TO_EXTENSION_MAP } from '@constants/mappers'

export function mapMimeTypeToExtension(mimeType: string) {
  const cleanMime = mimeType.split(';')[0].trim().toLowerCase()

  const extension = MIME_TO_EXTENSION_MAP.get(cleanMime)

  if (!extension) return null

  return extension
}

export function mapExtensionToMimeType(extension: string) {
  const cleanExtension = extension.replace('.', '').toLowerCase()

  const mimeType = EXTENSION_TO_MIME_MAP.get(cleanExtension)

  if (!mimeType) return null

  return mimeType
}
