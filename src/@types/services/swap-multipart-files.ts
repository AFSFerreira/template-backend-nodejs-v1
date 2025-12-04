import type { MultipartFile } from '@fastify/multipart'

export type ISwapMultipartFiles = {
  filePart: MultipartFile
  baseFolder: string
  filename: string
  anyExtension?: boolean
}
