import type {
  CreateHomePageSliderImageUseCaseRequest,
  CreateHomePageSliderImageUseCaseResponse,
} from '@custom-types/use-cases/slider-image/create-home-page-slider-image'
import type { DatabaseContext } from '@lib/prisma/helpers/database-context'
import type { SliderImagesRepository } from '@repositories/slider-images-repository'
import { MAX_SLIDER_IMAGES_QUANTITY } from '@constants/static-file-constants'
import { logError } from '@lib/logger/helpers/log-error'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import { SLIDER_IMAGE_CREATION_ERROR } from '@messages/loggings/slider-image-loggings'
import {
  buildHomePageSliderImagePath,
  buildTempSliderImagePath,
} from '@services/builders/paths/build-slider-image-path'
import { buildSliderImageUrl } from '@services/builders/urls/build-slider-image-url'
import { moveFile } from '@services/files/move-file'
import { HomePageSliderImagePersistError } from '@use-cases/errors/slider-image/home-page-slider-image-persist-error'
import { SliderImageLimitReachedError } from '@use-cases/errors/slider-image/slider-image-limit-reached-error'
import { deleteFile } from '@utils/files/delete-file'
import { inject, injectable } from 'tsyringe'

@injectable()
export class CreateHomePageSliderImageUseCase {
  constructor(
    @inject(tokens.repositories.sliderImages)
    private readonly sliderImagesRepository: SliderImagesRepository,

    @inject(tokens.infra.database)
    private readonly dbContext: DatabaseContext,
  ) {}

  async execute(
    createHomePageSliderImageUseCaseInput: CreateHomePageSliderImageUseCaseRequest,
  ): Promise<CreateHomePageSliderImageUseCaseResponse> {
    const persistHomePageSliderImage = await moveFile({
      oldFilePath: buildTempSliderImagePath(createHomePageSliderImageUseCaseInput.image),
      newFilePath: buildHomePageSliderImagePath(createHomePageSliderImageUseCaseInput.image),
    })

    if (!persistHomePageSliderImage) {
      throw new HomePageSliderImagePersistError()
    }

    try {
      const { createdSliderImage } = await this.dbContext.runInTransaction(async () => {
        const sliderImageQuanty = await this.sliderImagesRepository.totalCount()
        const newSliderOrder = sliderImageQuanty + 1

        if (newSliderOrder > MAX_SLIDER_IMAGES_QUANTITY) {
          throw new SliderImageLimitReachedError()
        }

        const createdSliderImage = await this.sliderImagesRepository.create({
          ...createHomePageSliderImageUseCaseInput,
          order: newSliderOrder,
        })

        return { createdSliderImage }
      })

      return {
        sliderImage: {
          ...createdSliderImage,
          image: buildSliderImageUrl(createdSliderImage.image, 'home-page'),
        },
      }
    } catch (error) {
      logError({ error, message: SLIDER_IMAGE_CREATION_ERROR })

      if (persistHomePageSliderImage) {
        await deleteFile(persistHomePageSliderImage)
      }

      throw error
    }
  }
}
