import type {
  GetAllHomePageSlidersUseCaseRequest,
  GetAllHomePageSlidersUseCaseResponse,
} from '@custom-types/use-cases/slider-image/get-all-home-page-sliders'
import type { SliderImagesRepository } from '@repositories/slider-images-repository'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import { buildSliderImageUrl } from '@services/builders/urls/build-slider-image-url'
import { inject, injectable } from 'tsyringe'

@injectable()
export class GetAllHomePageSlidersUseCase {
  constructor(
    @inject(tokens.repositories.sliderImages)
    private readonly sliderImagesRepository: SliderImagesRepository,
  ) {}

  async execute(query: GetAllHomePageSlidersUseCaseRequest): Promise<GetAllHomePageSlidersUseCaseResponse> {
    const slidersInfo = await this.sliderImagesRepository.listActive(query)

    return {
      ...slidersInfo,
      data: slidersInfo.data.map((slider) => ({
        ...slider,
        image: buildSliderImageUrl(slider.image, 'home-page'),
      })),
    }
  }
}
