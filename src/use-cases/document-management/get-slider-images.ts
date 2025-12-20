import type { GetSliderImagesUseCaseResponse } from '@custom-types/use-cases/document-management/get-slider-images'
import type { SliderImagesRepository } from '@repositories/slider-images-repository'
import { MAX_ACTIVE_SLIDER_IMAGES } from '@constants/slider-constants'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import { inject, injectable } from 'tsyringe'

interface GetSliderImagesUseCaseRequest {
  includeInactive?: boolean
}

@injectable()
export class GetSliderImagesUseCase {
  constructor(
    @inject(tokens.repositories.sliderImages)
    private readonly sliderImagesRepository: SliderImagesRepository,
  ) {}

  async execute({ includeInactive = false }: GetSliderImagesUseCaseRequest = {}): Promise<GetSliderImagesUseCaseResponse> {
    const onlyActive = !includeInactive
    const sliderImages = await this.sliderImagesRepository.findAll(onlyActive)

    const images = sliderImages.map(image => ({
      id: image.id,
      filename: image.filename,
      url: `/slider-banner/${image.filename}`,
      link: image.link,
      order: image.order,
      isActive: image.isActive,
    }))

    const activeCount = includeInactive
      ? images.filter(img => img.isActive).length
      : images.length

    return {
      images,
      activeCount,
      totalCount: images.length,
      maxActiveImages: MAX_ACTIVE_SLIDER_IMAGES,
    }
  }
}