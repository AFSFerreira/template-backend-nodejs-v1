import type { MultipartFile } from '@fastify/multipart'

export interface UploadDirectorBoardProfileImageUseCaseRequest {
  filePart?: MultipartFile
}

export interface UploadDirectorBoardProfileImageUseCaseResponse {
  filename: string
  publicUrl: string
}
