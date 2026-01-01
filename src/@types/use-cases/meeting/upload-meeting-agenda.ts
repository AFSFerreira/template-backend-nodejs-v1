import type { MultipartFile } from '@fastify/multipart'

export interface UploadMeetingAgendaUseCaseRequest {
  filePart?: MultipartFile
}

export interface UploadMeetingAgendaUseCaseResponse {
  filename: string
}
