import type { Readable } from 'node:stream'

export interface ISaveFile {
  fileStream: Readable
  folderPath: string
  originalFilename: string
}
