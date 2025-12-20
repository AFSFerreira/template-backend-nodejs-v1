import type { DeleteSliderImageUseCaseRequest } from '@custom-types/use-cases/document-management/delete-slider-image'
import type { SliderImagesRepository } from '@repositories/slider-images-repository'
import { SLIDER_IMAGES_PATH } from '@constants/dynamic-file-constants'
import { ApiError } from '@errors/api-error'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import fs from 'fs-extra'
import path from 'node:path'
import { inject, injectable } from 'tsyringe'

@injectable()
export class DeleteSliderImageUseCase {
  constructor(
    @inject(tokens.repositories.sliderImages)
    private readonly sliderImagesRepository: SliderImagesRepository,
  ) {}

  async execute({ id }: DeleteSliderImageUseCaseRequest): Promise<void> {
    const sliderImage = await this.sliderImagesRepository.findById(id)

    if (!sliderImage) {
      throw new ApiError({
        status: 404,
        body: {
          code: 'SLIDER_IMAGE_NOT_FOUND',
          message: 'Imagem do slider não encontrada',
        },
      })
    }

    const filepath = path.join(SLIDER_IMAGES_PATH, sliderImage.filename)

    await this.sliderImagesRepository.delete(id)

    if (await fs.pathExists(filepath)) {
      await fs.remove(filepath)
    }
  }
}
