import type { PaginatedResult } from '@custom-types/custom/pagination-meta-type'
import type { ListAllSliderImagesQuery } from '@custom-types/repository/slider-image/list-all-slider-images-query'
import type { Prisma, SliderImage } from '@prisma/client'

export interface SliderImagesRepository {
  create: (data: Prisma.SliderImageCreateInput) => Promise<SliderImage>
  findById: (id: number) => Promise<SliderImage | null>
  findByPublicId: (publicId: string) => Promise<SliderImage | null>
  totalCount: () => Promise<number>
  update: (id: number, data: Prisma.SliderImageUpdateInput) => Promise<SliderImage>
  delete: (id: number) => Promise<void>
  listAll: (query?: ListAllSliderImagesQuery) => Promise<PaginatedResult<SliderImage[]>>
  listActive: (query?: ListAllSliderImagesQuery) => Promise<PaginatedResult<SliderImage[]>>
}
