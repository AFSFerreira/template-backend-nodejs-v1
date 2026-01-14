import type { MultipartFile } from '@fastify/multipart'

export type IswapFiles = {
  filePart: MultipartFile
  baseFolder: string
  filename: string
  anyExtension?: boolean
}
