export interface UpdateSliderImageUseCaseRequest {
  id: number
  order?: number | null
  isActive?: boolean
  link?: string | null
}

export interface UpdateSliderImageUseCaseResponse {
  id: number
  filename: string
  link: string | null
  isActive: boolean
  order: number | null
}
