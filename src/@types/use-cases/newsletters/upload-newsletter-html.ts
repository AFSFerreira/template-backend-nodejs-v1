import type { MultipartFile } from '@fastify/multipart'

export interface UploadNewsletterHtmlUseCaseRequest {
  originalFilename: string
  filePart?: MultipartFile
}

export interface UploadNewsletterHtmlUseCaseResponse {
  fileName: string
}
