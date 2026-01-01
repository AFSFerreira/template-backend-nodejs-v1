import path from 'node:path'
import { PUBLIC_DOCUMENTS_PATH } from '@constants/dynamic-file-constants'

export function buildDocumentPath(filename: string) {
  return path.resolve(PUBLIC_DOCUMENTS_PATH, filename)
}
