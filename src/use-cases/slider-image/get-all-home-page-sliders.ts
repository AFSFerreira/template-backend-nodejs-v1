import type {
  GetAllHomePageSlidersUseCaseRequest,
  GetAllHomePageSlidersUseCaseResponse,
} from '@custom-types/use-cases/slider-image/get-all-home-page-sliders'
import type { SliderImagesRepository } from '@repositories/slider-images-repository'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { inject, singleton } from 'tsyringe'

@singleton()
export class GetAllHomePageSlidersUseCase {
  constructor(
    @inject(tsyringeTokens.repositories.sliderImages)
    private readonly sliderImagesRepository: SliderImagesRepository,
  ) {}

  async execute(query: GetAllHomePageSlidersUseCaseRequest): Promise<GetAllHomePageSlidersUseCaseResponse> {
    const slidersInfo = await this.sliderImagesRepository.listActive(query)

    return slidersInfo
  }
}
