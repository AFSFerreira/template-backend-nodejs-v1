import type { MultipartFile } from '@fastify/multipart'

export interface UploadSliderImageUseCaseRequest {
  filePart?: MultipartFile
}

export interface UploadSliderImageUseCaseResponse {
  filename: string
}
