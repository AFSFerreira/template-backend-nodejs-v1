import type { ListAllSliderImagesQuery } from '@custom-types/repository/prisma/slider-image/list-all-slider-images-query'
import type { UpdateSliderImageQuery } from '@custom-types/repository/prisma/slider-image/update-slider-image-query'
import type { DatabaseContext } from '@lib/prisma/helpers/database-context'
import type { Prisma } from '@prisma/generated/client'
import type { SliderImagesRepository } from '@repositories/slider-images-repository'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { evalOffset } from '@utils/generics/eval-offset'
import { evalTotalPages } from '@utils/generics/eval-total-pages'
import { inject, injectable } from 'tsyringe'

@injectable()
export class PrismaSliderImagesRepository implements SliderImagesRepository {
  constructor(
    @inject(tsyringeTokens.infra.database)
    private readonly dbContext: DatabaseContext,
  ) {}

  async create(data: Prisma.SliderImageCreateInput) {
    const sliderImage = await this.dbContext.client.sliderImage.create({
      data,
    })
    return sliderImage
  }

  async findById(id: number) {
    const sliderImage = await this.dbContext.client.sliderImage.findUnique({
      where: { id },
    })
    return sliderImage
  }

  async findByPublicId(publicId: string) {
    const sliderImage = await this.dbContext.client.sliderImage.findUnique({
      where: { publicId },
    })
    return sliderImage
  }

  async totalCount() {
    const totalSliderImages = await this.dbContext.client.sliderImage.count()
    return totalSliderImages
  }

  async listAll(query: ListAllSliderImagesQuery) {
    const orderBy: Prisma.SliderImageOrderByWithRelationInput[] = [
      ...(query.orderBy?.orderOrder ? [{ order: query.orderBy.orderOrder }] : []),
      { id: 'asc' },
    ]

    const { limit: take, offset: skip } = evalOffset({ page: query.page, limit: query.limit })

    const [countResult, sliderImages] = await Promise.all([
      this.dbContext.client.sliderImage.count(),
      this.dbContext.client.sliderImage.findMany({
        skip,
        take,
        orderBy,
      }),
    ])

    const pageSize = query.limit
    const totalItems = countResult

    const totalPages = evalTotalPages({ pageSize, totalItems })

    return {
      data: sliderImages,
      meta: {
        totalItems,
        totalPages,
        currentPage: query.page,
        pageSize,
      },
    }
  }

  async listActive(query: ListAllSliderImagesQuery) {
    const where: Prisma.SliderImageWhereInput = { isActive: true }
    const orderBy: Prisma.SliderImageOrderByWithRelationInput[] = [
      ...(query?.orderBy?.orderOrder ? [{ order: query.orderBy.orderOrder }] : [{ order: 'asc' as const }]),
      { id: 'asc' },
    ]

    const { limit: take, offset: skip } = evalOffset({ page: query.page, limit: query.limit })

    const [countResult, sliderImages] = await Promise.all([
      this.dbContext.client.sliderImage.count({ where }),
      this.dbContext.client.sliderImage.findMany({
        where,
        skip,
        take,
        orderBy,
      }),
    ])

    const pageSize = query.limit
    const totalItems = countResult

    const totalPages = evalTotalPages({ pageSize, totalItems })

    return {
      data: sliderImages,
      meta: {
        totalItems,
        totalPages,
        currentPage: query.page,
        pageSize,
      },
    }
  }

  async update({ id, data }: UpdateSliderImageQuery) {
    const sliderImage = await this.dbContext.client.sliderImage.update({
      where: { id },
      data,
    })
    return sliderImage
  }

  async delete(id: number) {
    await this.dbContext.client.sliderImage.delete({
      where: { id },
    })
  }
}
