import type { MultipartFile } from '@fastify/multipart'

export interface UploadDocumentUseCaseRequest {
  filePart?: MultipartFile
  baseFolder: string
  originalFilename: string
}

export interface UploadDocumentUseCaseResponse {}
