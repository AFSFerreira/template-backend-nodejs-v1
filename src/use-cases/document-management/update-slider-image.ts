import type { UpdateSliderImageUseCaseRequest, UpdateSliderImageUseCaseResponse } from '@custom-types/use-cases/document-management/update-slider-image'
import type { SliderImagesRepository } from '@repositories/slider-images-repository'
import { MAX_ACTIVE_SLIDER_IMAGES } from '@constants/slider-constants'
import { ApiError } from '@errors/api-error'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import { SLIDER_ACTIVE_LIMIT_REACHED } from '@messages/responses/document-management-responses'
import { inject, injectable } from 'tsyringe'

@injectable()
export class UpdateSliderImageUseCase {
  constructor(
    @inject(tokens.repositories.sliderImages)
    private readonly sliderImagesRepository: SliderImagesRepository,
  ) {}

  async execute({ id, order, isActive, link }: UpdateSliderImageUseCaseRequest): Promise<UpdateSliderImageUseCaseResponse> {

    const existingImage = await this.sliderImagesRepository.findById(id)
    if (!existingImage) {
      throw new ApiError({
        status: 404,
        body: {
          code: 'SLIDER_IMAGE_NOT_FOUND',
          message: 'Imagem do slider não encontrada',
        },
      })
    }

    let updateData: { order?: number | null; isActive?: boolean; link?: string | null } = {}

    // Se está tentando ativar uma imagem, verificar o limite
    if (isActive === true) {
      const activeImages = await this.sliderImagesRepository.findAll(true)
      const currentImage = activeImages.find(img => img.id === id)

      // Se a imagem já está ativa, não precisa verificar o limite
      if (!currentImage && activeImages.length >= MAX_ACTIVE_SLIDER_IMAGES) {
        throw new ApiError(SLIDER_ACTIVE_LIMIT_REACHED)
      }

      // Se está ativando e não forneceu order, atribuir a próxima ordem
      if (!currentImage && order === undefined) {
        const maxOrder = await this.sliderImagesRepository.getMaxOrder()
        updateData.order = maxOrder + 1
      } else if (order !== undefined) {
        updateData.order = order
      }

      updateData.isActive = true
    }

    // Se está desativando, remover a ordem
    if (isActive === false) {
      updateData.order = null
      updateData.isActive = false
    }

    // Se forneceu link, adicionar ao update
    if (link !== undefined) {
      updateData.link = link
    }

    // Se forneceu order mas não está alterando isActive, apenas atualizar order
    if (order !== undefined && isActive === undefined) {
      updateData.order = order
    }

    const sliderImage = await this.sliderImagesRepository.update(id, updateData)

    return {
      id: sliderImage.id,
      filename: sliderImage.filename,
      link: sliderImage.link,
      isActive: sliderImage.isActive,
      order: sliderImage.order,
    }
  }
}
