import type {
  DeleteSliderImageUseCaseRequest,
  DeleteSliderImageUseCaseResponse,
} from '@custom-types/use-cases/slider-image/delete-slider-image'
import type { DatabaseContext } from '@lib/prisma/helpers/database-context'
import type { SliderImagesRepository } from '@repositories/slider-images-repository'
import { logger } from '@lib/logger'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import { SLIDER_IMAGE_DELETION_SUCCESSFUL } from '@messages/loggings/slider-image-loggings'
import { buildHomePageSliderImagePath } from '@services/builders/paths/build-slider-image-path'
import { SliderImageNotFoundError } from '@use-cases/errors/slider-image/slider-image-not-found-error'
import { deleteFile } from '@utils/files/delete-file'
import { ensureExists } from '@utils/validators/ensure'
import { inject, injectable } from 'tsyringe'

@injectable()
export class DeleteSliderImageUseCase {
  constructor(
    @inject(tokens.repositories.sliderImages)
    private readonly sliderImagesRepository: SliderImagesRepository,

    @inject(tokens.infra.database)
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

    await deleteFile(buildHomePageSliderImagePath(sliderImage.image))

    logger.info({ sliderImagePublicId: sliderImage.publicId }, SLIDER_IMAGE_DELETION_SUCCESSFUL)

    return {}
  }
}
