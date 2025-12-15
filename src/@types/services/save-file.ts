import type { Readable } from 'node:stream'

export interface SaveFileInput {
  fileStream: Readable
  folderPath: string
  originalFilename: string
}
