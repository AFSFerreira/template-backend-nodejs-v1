import type { MultipartFile } from '@fastify/multipart'

export interface UploadUserProfileImageUseCaseRequest {
  filePart?: MultipartFile
}

export interface UploadUserProfileImageUseCaseResponse {
  filename: string
}
