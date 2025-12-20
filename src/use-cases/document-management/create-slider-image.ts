import type { CreateSliderImageUseCaseRequest, CreateSliderImageUseCaseResponse } from '@custom-types/use-cases/document-management/create-slider-image'
import type { SliderImagesRepository } from '@repositories/slider-images-repository'
import { SLIDER_IMAGES_PATH } from '@constants/dynamic-file-constants'
import { MAX_ACTIVE_SLIDER_IMAGES } from '@constants/slider-constants'
import { ApiError } from '@errors/api-error'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import { SLIDER_ACTIVE_LIMIT_REACHED } from '@messages/responses/document-management-responses'
import { processSliderImage } from '@utils/image-processor'
import fs from 'fs-extra'
import path from 'node:path'
import { inject, injectable } from 'tsyringe'

@injectable()
export class CreateSliderImageUseCase {
  constructor(
    @inject(tokens.repositories.sliderImages)
    private readonly sliderImagesRepository: SliderImagesRepository,
  ) {}

  async execute({ file }: CreateSliderImageUseCaseRequest): Promise<CreateSliderImageUseCaseResponse> {
    const activeImages = await this.sliderImagesRepository.findAll(true)
    if (activeImages.length >= MAX_ACTIVE_SLIDER_IMAGES) {
      throw new ApiError(SLIDER_ACTIVE_LIMIT_REACHED)
    }

    // Ler o arquivo em buffer
    const fileBuffer = await file.toBuffer()

    // Processar a imagem (validar, redimensionar, otimizar)
    const originalFilename = `slider-${Date.now()}`
    const { buffer: processedBuffer, filename } = await processSliderImage(fileBuffer, originalFilename)

    // Garantir que o diretório existe
    await fs.ensureDir(SLIDER_IMAGES_PATH)

    // Salvar imagem processada
    const filepath = path.join(SLIDER_IMAGES_PATH, filename)
    await fs.writeFile(filepath, processedBuffer)

    // Registrar no banco de dados
    const maxOrder = await this.sliderImagesRepository.getMaxOrder()
    const sliderImage = await this.sliderImagesRepository.create(filename, maxOrder + 1)

    return {
      id: sliderImage.id,
      filename: sliderImage.filename,
      url: `/slider-banner/${sliderImage.filename}`,
      order: sliderImage.order,
    }
  }
}
