import type {
  CreateHomePageSliderImageUseCaseRequest,
  CreateHomePageSliderImageUseCaseResponse,
} from '@custom-types/use-cases/slider-image/create-home-page-slider-image'
import type { DatabaseContext } from '@lib/prisma/helpers/database-context'
import type { SliderImagesRepository } from '@repositories/slider-images-repository'
import { MAX_SLIDER_IMAGES_QUANTITY } from '@constants/static-file-constants'
import { moveFileEnqueued } from '@jobs/queues/facades/file-queue-facade'
import { logError } from '@lib/logger/helpers/log-error'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { SLIDER_IMAGE_CREATION_ERROR } from '@messages/loggings/models/slider-image-loggings'
import {
  buildHomePageSliderImagePath,
  buildTempSliderImagePath,
} from '@services/builders/paths/build-slider-image-path'
import { buildSliderImageUrl } from '@services/builders/urls/build-slider-image-url'
import { HomePageSliderImagePersistError } from '@use-cases/errors/slider-image/home-page-slider-image-persist-error'
import { SliderImageLimitReachedError } from '@use-cases/errors/slider-image/slider-image-limit-reached-error'
import { ensureExists } from '@utils/validators/ensure'
import { inject, injectable } from 'tsyringe'

@injectable()
export class CreateHomePageSliderImageUseCase {
  constructor(
    @inject(tsyringeTokens.repositories.sliderImages)
    private readonly sliderImagesRepository: SliderImagesRepository,

    @inject(tsyringeTokens.infra.database)
    private readonly dbContext: DatabaseContext,
  ) {}

  async execute(
    createHomePageSliderImageUseCaseInput: CreateHomePageSliderImageUseCaseRequest,
  ): Promise<CreateHomePageSliderImageUseCaseResponse> {
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

    const homePageSliderImagePaths = {
      oldFilePath: buildTempSliderImagePath(createHomePageSliderImageUseCaseInput.image),
      newFilePath: buildHomePageSliderImagePath(createHomePageSliderImageUseCaseInput.image),
    }

    try {
      ensureExists({
        value: await moveFileEnqueued(homePageSliderImagePaths),
        error: new HomePageSliderImagePersistError(),
      })
    } catch (error) {
      logError({ error, message: SLIDER_IMAGE_CREATION_ERROR })

      await moveFileEnqueued({
        oldFilePath: homePageSliderImagePaths.newFilePath,
        newFilePath: homePageSliderImagePaths.oldFilePath,
      })

      throw error
    }

    return {
      sliderImage: {
        ...createdSliderImage,
        image: buildSliderImageUrl(createdSliderImage.image, 'home-page'),
      },
    }
  }
}
