import type { SliderImage } from '@prisma/client'

export interface SliderImagesRepository {
  findAll: (onlyActive?: boolean) => Promise<SliderImage[]>
  findById: (id: number) => Promise<SliderImage | null>
  findByFilename: (filename: string) => Promise<SliderImage | null>
  create: (filename: string, order: number) => Promise<SliderImage>
  update: (id: number, data: { order?: number | null; isActive?: boolean; link?: string | null }) => Promise<SliderImage>
  delete: (id: number) => Promise<void>
  getMaxOrder: () => Promise<number>
}
