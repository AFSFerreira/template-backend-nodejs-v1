import type { FileHash } from '@custom-types/utils/hashes/file-hash'
import { v4 as uuidv4 } from 'uuid'

export function generateFileHash(): FileHash {
  return uuidv4() as FileHash
}
