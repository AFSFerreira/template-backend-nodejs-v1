import path from 'node:path'
import { DOCUMENTS_PATH } from '@constants/dynamic-file-constants'

export function buildDocumentPath(filename: string) {
  return path.resolve(DOCUMENTS_PATH, filename)
}
