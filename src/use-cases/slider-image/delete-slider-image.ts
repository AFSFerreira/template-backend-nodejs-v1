import type {
  DeleteSliderImageUseCaseRequest,
  DeleteSliderImageUseCaseResponse,
} from '@custom-types/use-cases/slider-image/delete-slider-image'
import type { DatabaseContext } from '@lib/prisma/helpers/database-context'
import type { SliderImagesRepository } from '@repositories/slider-images-repository'
import { deleteFileEnqueued } from '@jobs/queues/facades/file-queue-facade'
import { logger } from '@lib/pino'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { SLIDER_IMAGE_DELETION_SUCCESSFUL } from '@messages/loggings/models/slider-image-loggings'
import { buildHomePageSliderImagePath } from '@services/builders/paths/build-slider-image-path'
import { SliderImageNotFoundError } from '@use-cases/errors/slider-image/slider-image-not-found-error'
import { ensureExists } from '@utils/validators/ensure'
import { inject, injectable } from 'tsyringe'

@injectable()
export class DeleteSliderImageUseCase {
  constructor(
    @inject(tsyringeTokens.repositories.sliderImages)
    private readonly sliderImagesRepository: SliderImagesRepository,

    @inject(tsyringeTokens.infra.database)
    private readonly dbContext: DatabaseContext,
  ) {}

  async execute({ publicId }: DeleteSliderImageUseCaseRequest): Promise<DeleteSliderImageUseCaseResponse> {
    const sliderImage = ensureExists({
      value: await this.sliderImagesRepository.findByPublicId(publicId),
      error: new SliderImageNotFoundError(),
    })

    await this.dbContext.runInTransaction(async () => {
      await this.sliderImagesRepository.delete(sliderImage.id)
      await this.sliderImagesRepository.decrementOrdersStartingFrom(sliderImage.order)
    })

    await deleteFileEnqueued({
      filePath: buildHomePageSliderImagePath(sliderImage.image),
    })

    logger.info({ sliderImagePublicId: sliderImage.publicId }, SLIDER_IMAGE_DELETION_SUCCESSFUL)

    return {}
  }
}
