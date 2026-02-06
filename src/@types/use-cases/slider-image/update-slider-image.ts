import type { UpdateSliderImageBodySchemaType } from '@custom-types/http/schemas/slider-image/update-slider-image-body-schema'
import type { SliderImage } from '@prisma/generated/client'

export interface UpdateSliderImageUseCaseRequest {
  publicId: string
  data: UpdateSliderImageBodySchemaType
}

export interface UpdateSliderImageUseCaseResponse {
  sliderImage: SliderImage
}
