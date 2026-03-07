import type {
  GetAllHomePageSlidersRestrictUseCaseRequest,
  GetAllHomePageSlidersRestrictUseCaseResponse,
} from '@custom-types/use-cases/slider-image/get-all-home-page-sliders-restrict'
import type { SliderImagesRepository } from '@repositories/slider-images-repository'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { inject, injectable } from 'tsyringe'

@injectable()
export class GetAllHomePageSlidersRestrictUseCase {
  constructor(
    @inject(tsyringeTokens.repositories.sliderImages)
    private readonly sliderImagesRepository: SliderImagesRepository,
  ) {}

  async execute(
    query: GetAllHomePageSlidersRestrictUseCaseRequest,
  ): Promise<GetAllHomePageSlidersRestrictUseCaseResponse> {
    const sliderImagesInfo = await this.sliderImagesRepository.listAll(query)

    return sliderImagesInfo
  }
}
