import type {
  DeleteSliderImageUseCaseRequest,
  DeleteSliderImageUseCaseResponse,
} from '@custom-types/use-cases/slider-image/delete-slider-image'
import type { DatabaseContext } from '@lib/prisma/helpers/database-context'
import type { SliderImagesRepository } from '@repositories/slider-images-repository'
import { fileQueue } from '@jobs/queues/definitions/file-queue'
import { logger } from '@lib/logger'
import { logError } from '@lib/logger/helpers/log-error'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { FAILED_TO_ENQUEUE_FILE_JOB } from '@messages/loggings/jobs/queues/files'
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
    const { sliderImage } = await this.dbContext.runInTransaction(async () => {
      const sliderImage = ensureExists({
        value: await this.sliderImagesRepository.findByPublicId(publicId),
        error: new SliderImageNotFoundError(),
      })

      await this.sliderImagesRepository.delete(sliderImage.id)

      return { sliderImage }
    })

    try {
      fileQueue.add('delete', {
        type: 'delete',
        filePath: buildHomePageSliderImagePath(sliderImage.image),
      })
    } catch (error) {
      logError({
        error,
        message: FAILED_TO_ENQUEUE_FILE_JOB,
      })
    }

    logger.info({ sliderImagePublicId: sliderImage.publicId }, SLIDER_IMAGE_DELETION_SUCCESSFUL)

    return {}
  }
}
