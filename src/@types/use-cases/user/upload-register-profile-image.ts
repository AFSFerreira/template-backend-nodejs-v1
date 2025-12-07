import type { MultipartFile } from '@fastify/multipart'

export interface UploadRegisterProfileImageUseCaseRequest {
  filePart?: MultipartFile
}

export interface UploadRegisterProfileImageUseCaseResponse {
  fileName: string
}
