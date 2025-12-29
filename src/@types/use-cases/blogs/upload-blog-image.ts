import type { MultipartFile } from '@fastify/multipart'

export interface UploadBlogImageUseCaseRequest {
  filePart?: MultipartFile
}

export interface UploadBlogImageUseCaseResponse {
  filename: string
}
