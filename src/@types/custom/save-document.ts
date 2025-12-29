import type { MultipartFile } from '@fastify/multipart'

export interface ISaveMultipartFile {
  filePart: MultipartFile
  baseFolder: string
  newFilename?: string
}
