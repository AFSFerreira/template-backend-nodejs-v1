import type { DatabaseContext } from '@lib/prisma/helpers/database-context'
import type { Prisma } from '@prisma/client'
import type { SliderImagesRepository } from '@repositories/slider-images-repository'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import { inject, injectable } from 'tsyringe'

@injectable()
export class PrismaSliderImagesRepository implements SliderImagesRepository {
  constructor(
    @inject(tokens.infra.database)
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

  async update(id: number, data: Prisma.SliderImageUpdateInput) {
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
