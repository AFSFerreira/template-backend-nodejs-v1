import type { MultipartFile } from '@fastify/multipart'

export interface UploadInstitutionalAboutImageUseCaseRequest {
  filePart?: MultipartFile
}

export interface UploadInstitutionalAboutImageUseCaseResponse {
  filename: string
  publicUrl: string
}
