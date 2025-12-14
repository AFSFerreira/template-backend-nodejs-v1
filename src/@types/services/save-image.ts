import type { Readable } from 'node:stream'

export interface SaveImageInput {
  originalFilename: string
  imageStream: Readable
  folderPath: string
}
