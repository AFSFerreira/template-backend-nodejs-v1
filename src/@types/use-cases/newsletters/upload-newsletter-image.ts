import type { MultipartFile } from '@fastify/multipart'

export interface UploadNewsletterImageUseCaseRequest {
  filePart?: MultipartFile
}

export interface UploadNewsletterImageUseCaseResponse {
  filename: string
}
