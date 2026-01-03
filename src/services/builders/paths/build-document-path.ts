import { INSTITUTIONAL_INFO_PUBLIC_DOCUMENTS_PATH } from '@constants/dynamic-file-constants'
import path from 'node:path'

export function buildDocumentPath(filename: string) {
  return path.resolve(INSTITUTIONAL_INFO_PUBLIC_DOCUMENTS_PATH, filename)
}
