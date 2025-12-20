import type { MultipartFile } from '@fastify/multipart'

export interface CreateSliderImageUseCaseRequest {
  file: MultipartFile
}

export interface CreateSliderImageUseCaseResponse {
  id: number
  filename: string
  url: string
  order: number | null
}
