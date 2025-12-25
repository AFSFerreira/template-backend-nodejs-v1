import type { Prisma, SliderImage } from '@prisma/client'

export interface SliderImagesRepository {
  create: (data: Prisma.SliderImageCreateInput) => Promise<SliderImage>
  findById: (id: number) => Promise<SliderImage | null>
  findByPublicId: (publicId: string) => Promise<SliderImage | null>
  totalCount: () => Promise<number>
  update: (id: number, data: Prisma.SliderImageUpdateInput) => Promise<SliderImage | null>
  delete: (id: number) => Promise<void>
}
