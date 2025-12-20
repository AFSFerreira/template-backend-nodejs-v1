export interface GetSliderImagesUseCaseResponse {
  images: Array<{
    id: number
    filename: string
    url: string
    link: string | null
    order: number | null
    isActive: boolean
  }>
  activeCount: number
  totalCount: number
  maxActiveImages: number
}