import type { UpdateSliderImageBodySchemaType } from '@custom-types/schemas/slider-image/update-slider-image-body-schema'
import type { SliderImage } from '@prisma/client'

export interface UpdateSliderImageUseCaseRequest {
  publicId: string
  data: UpdateSliderImageBodySchemaType
}

export interface UpdateSliderImageUseCaseResponse {
  sliderImage: SliderImage
}
