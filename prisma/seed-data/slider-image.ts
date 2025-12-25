import type { Prisma } from '@prisma/client'

export const sliderImageData1: Prisma.SliderImageCreateInput = {
  image: 'banner-1.png',
  order: 1,
}

export const sliderImageData2: Prisma.SliderImageCreateInput = {
  image: 'banner-2.png',
  order: 2,
}

export const sliderImageData3: Prisma.SliderImageCreateInput = {
  image: 'banner-3.png',
  order: 3,
}

export const sliderImageData4: Prisma.SliderImageCreateInput = {
  image: 'banner-4.png',
  order: 4,
}

export const sliderImageData5: Prisma.SliderImageCreateInput = {
  image: 'banner-5.png',
  order: 5,
}

export const sliderImageData6: Prisma.SliderImageCreateInput = {
  image: 'banner-6.png',
  order: 6,
}

export const sliderImageDataArray1: Prisma.SliderImageCreateInput[] = [
  sliderImageData1,
  sliderImageData2,
  sliderImageData3,
  sliderImageData4,
  sliderImageData5,
  sliderImageData6,
]
