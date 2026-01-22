import type { SliderImage } from '@prisma/client'

export interface HomePageSliderImagePresenterInput extends SliderImage {}

export interface HTTPHomePageSliderImage {
  id: string
  image: string
  link: string | null
  order: number
  isActive: boolean
}
