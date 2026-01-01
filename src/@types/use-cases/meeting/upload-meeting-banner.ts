import type { MultipartFile } from '@fastify/multipart'

export interface UploadMeetingBannerUseCaseRequest {
  filePart?: MultipartFile
}

export interface UploadMeetingBannerUseCaseResponse {
  filename: string
}
