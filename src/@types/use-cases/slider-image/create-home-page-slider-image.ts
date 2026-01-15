import type { CreateHomePageSliderImageBodySchemaType } from '@custom-types/http/schemas/slider-image/create-home-page-slider-image-body-schema'
import type { SliderImage } from '@prisma/client'

export interface CreateHomePageSliderImageUseCaseRequest extends CreateHomePageSliderImageBodySchemaType {}

export interface CreateHomePageSliderImageUseCaseResponse {
  sliderImage: SliderImage
}
