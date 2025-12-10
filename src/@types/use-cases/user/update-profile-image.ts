import type { MultipartFile } from '@fastify/multipart'

export interface UpdateProfileImageUseCaseRequest {
  userPublicId: string
  filePart?: MultipartFile
}

export interface UpdateProfileImageUseCaseResponse {
  fileName: string
}
