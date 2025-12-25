import type { MultipartFile } from '@fastify/multipart'

export interface UploadBlogBannerUseCaseRequest {
  originalFilename: string
  filePart?: MultipartFile
}

export interface UploadBlogBannerUseCaseResponse {
  filename: string
}
