import type { PaginatedResult } from '@custom-types/custom/pagination-meta-type'
import type { ListAllSliderImagesQuery } from '@custom-types/repository/prisma/slider-image/list-all-slider-images-query'
import type { UpdateSliderImageQuery } from '@custom-types/repository/prisma/slider-image/update-slider-image-query'
import type { Prisma, SliderImage } from '@prisma/generated/client'

export interface SliderImagesRepository {
  create: (data: Prisma.SliderImageCreateInput) => Promise<SliderImage>
  findById: (id: number) => Promise<SliderImage | null>
  findByPublicId: (publicId: string) => Promise<SliderImage | null>
  totalCount: () => Promise<number>
  update: (query: UpdateSliderImageQuery) => Promise<SliderImage>
  delete: (id: number) => Promise<void>
  shiftOrderDown: (order: number) => Promise<void>
  listAll: (query: ListAllSliderImagesQuery) => Promise<PaginatedResult<SliderImage[]>>
  listActive: (query: ListAllSliderImagesQuery) => Promise<PaginatedResult<SliderImage[]>>
  swapOrders: (firstId: number, secondId: number) => Promise<boolean>
}
