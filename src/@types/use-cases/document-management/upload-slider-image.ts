import type { MultipartFile } from '@fastify/multipart'

export interface UploadSliderImageUseCaseRequest {
  file: MultipartFile
}

export interface UploadSliderImageUseCaseResponse {
  filename: string
  filepath: string
}