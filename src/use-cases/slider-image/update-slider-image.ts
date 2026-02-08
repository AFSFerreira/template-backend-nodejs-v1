import type {
  UpdateSliderImageUseCaseRequest,
  UpdateSliderImageUseCaseResponse,
} from '@custom-types/use-cases/slider-image/update-slider-image'
import type { DatabaseContext } from '@lib/prisma/helpers/database-context'
import type { SliderImagesRepository } from '@repositories/slider-images-repository'
import { MAX_SLIDER_IMAGES_QUANTITY } from '@constants/static-file-constants'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { buildSliderImageUrl } from '@services/builders/urls/build-slider-image-url'
import { SliderImageInvalidOrderError } from '@use-cases/errors/slider-image/slider-image-invalid-order-error'
import { SliderImageNotFoundError } from '@use-cases/errors/slider-image/slider-image-not-found-error'
import { ensureExists } from '@utils/validators/ensure'
import { inject, injectable } from 'tsyringe'

@injectable()
export class UpdateSliderImageUseCase {
  constructor(
    @inject(tsyringeTokens.repositories.sliderImages)
    private readonly sliderImagesRepository: SliderImagesRepository,

    @inject(tsyringeTokens.infra.database)
    private readonly dbContext: DatabaseContext,
  ) {}

  async execute({ publicId, data }: UpdateSliderImageUseCaseRequest): Promise<UpdateSliderImageUseCaseResponse> {
    const { sliderImage } = await this.dbContext.runInTransaction(async () => {
      const sliderImage = ensureExists({
        value: await this.sliderImagesRepository.findByPublicId(publicId),
        error: new SliderImageNotFoundError(),
      })

      if (data.order) {
        const sliderImageQuanty = await this.sliderImagesRepository.totalCount()

        if (data.order < 1 || data.order > sliderImageQuanty || data.order > MAX_SLIDER_IMAGES_QUANTITY) {
          throw new SliderImageInvalidOrderError()
        }
      }

      const shouldUpdate = Object.keys(data).length > 0

      const updatedSliderImage = shouldUpdate
        ? await this.sliderImagesRepository.update({
            id: sliderImage.id,
            data,
          })
        : sliderImage

      return { sliderImage: updatedSliderImage }
    })

    return {
      sliderImage: {
        ...sliderImage,
        image: buildSliderImageUrl(sliderImage.image, 'home-page'),
      },
    }
  }
}
