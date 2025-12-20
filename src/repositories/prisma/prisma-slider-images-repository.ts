import type { DatabaseContext } from '@lib/prisma/helpers/database-context'
import type { SliderImagesRepository } from '@repositories/slider-images-repository'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import { inject, injectable } from 'tsyringe'

@injectable()
export class PrismaSliderImagesRepository implements SliderImagesRepository {
  constructor(
    @inject(tokens.infra.database)
    private readonly dbContext: DatabaseContext,
  ) {}

  async findAll(onlyActive = false) {
    const sliderImages = await this.dbContext.client.sliderImage.findMany({
      where: onlyActive ? { isActive: true } : undefined,
      orderBy: [
        { order: 'asc' },
        { createdAt: 'desc' },
      ],
    })
    return sliderImages
  }

  async findById(id: number) {
    const sliderImage = await this.dbContext.client.sliderImage.findUnique({
      where: { id },
    })
    return sliderImage
  }

  async findByFilename(filename: string) {
    const sliderImage = await this.dbContext.client.sliderImage.findUnique({
      where: { filename },
    })
    return sliderImage
  }

  async create(filename: string, order: number) {
    const sliderImage = await this.dbContext.client.sliderImage.create({
      data: {
        filename,
        order,
        isActive: true,
      },
    })
    return sliderImage
  }

  async update(id: number, data: { order?: number | null; isActive?: boolean; link?: string | null }) {
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

  async getMaxOrder() {
    const result = await this.dbContext.client.sliderImage.aggregate({
      _max: {
        order: true,
      },
    })
    return result._max.order ?? 0
  }
}
