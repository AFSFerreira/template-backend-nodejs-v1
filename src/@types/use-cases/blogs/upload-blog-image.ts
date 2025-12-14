import type { MultipartFile } from '@fastify/multipart'

export interface UploadBlogImageUseCaseRequest {
  originalFilename: string
  filePart?: MultipartFile
}

export interface UploadBlogImageUseCaseResponse {
  fileName: string
}
