import type { MultipartFile } from '@fastify/multipart'

export interface UploadNewsletterHtmlUseCaseRequest {
  filePart?: MultipartFile
}

export interface UploadNewsletterHtmlUseCaseResponse {
  filename: string
}
