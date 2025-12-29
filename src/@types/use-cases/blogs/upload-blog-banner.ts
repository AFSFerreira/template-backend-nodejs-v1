import type { MultipartFile } from '@fastify/multipart'

export interface UploadBlogBannerUseCaseRequest {
  filePart?: MultipartFile
}

export interface UploadBlogBannerUseCaseResponse {
  filename: string
}
