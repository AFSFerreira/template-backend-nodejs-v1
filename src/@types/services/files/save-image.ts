import type { Readable } from 'node:stream'

export interface ISaveImageInput {
  originalFilename: string
  imageStream: Readable
  folderPath: string
}
