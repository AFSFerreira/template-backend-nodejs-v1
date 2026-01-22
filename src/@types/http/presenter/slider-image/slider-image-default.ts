import type { SliderImage } from '@prisma/client'

export interface SliderImageDefaultPresenterInput extends SliderImage {}

export interface HTTPSliderImage {
  id: string
  image: string
  link: string | null
  order: number
  isActive: boolean
}
