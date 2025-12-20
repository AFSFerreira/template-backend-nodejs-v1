import {
  MAX_SLIDER_IMAGE_SIZE_BYTES,
  SLIDER_IMAGE_HEIGHT,
  SLIDER_IMAGE_MIN_HEIGHT,
  SLIDER_IMAGE_MIN_WIDTH,
  SLIDER_IMAGE_WIDTH,
  SLIDER_MAX_ASPECT_RATIO,
  SLIDER_MIN_ASPECT_RATIO,
} from '@constants/slider-constants'
import { ApiError } from '@errors/api-error'
import {
  SLIDER_IMAGE_INVALID_ASPECT_RATIO,
  SLIDER_IMAGE_INVALID_FORMAT,
  SLIDER_IMAGE_TOO_LARGE,
  SLIDER_IMAGE_TOO_SMALL,
} from '@messages/responses/document-management-responses'
import sharp from 'sharp'

interface ProcessedImage {
  buffer: Buffer
  filename: string
}

const ALLOWED_FORMATS = ['jpeg', 'jpg', 'png', 'webp']

export async function processSliderImage(
  fileBuffer: Buffer,
  originalFilename: string,
): Promise<ProcessedImage> {
  // Validar tamanho do arquivo
  if (fileBuffer.length > MAX_SLIDER_IMAGE_SIZE_BYTES) {
    throw new ApiError(SLIDER_IMAGE_TOO_LARGE)
  }

  // Obter metadados da imagem
  const image = sharp(fileBuffer)
  const metadata = await image.metadata()

  // Validar formato
  if (!metadata.format || !ALLOWED_FORMATS.includes(metadata.format)) {
    throw new ApiError(SLIDER_IMAGE_INVALID_FORMAT)
  }

  // Validar dimensões mínimas
  if (!metadata.width || !metadata.height) {
    throw new ApiError(SLIDER_IMAGE_INVALID_FORMAT)
  }

  if (metadata.width < SLIDER_IMAGE_MIN_WIDTH || metadata.height < SLIDER_IMAGE_MIN_HEIGHT) {
    throw new ApiError(SLIDER_IMAGE_TOO_SMALL)
  }

  // Validar aspect ratio
  const aspectRatio = metadata.width / metadata.height
  if (aspectRatio < SLIDER_MIN_ASPECT_RATIO || aspectRatio > SLIDER_MAX_ASPECT_RATIO) {
    throw new ApiError(SLIDER_IMAGE_INVALID_ASPECT_RATIO)
  }

  // Processar imagem: redimensionar, otimizar e converter
  const processedBuffer = await sharp(fileBuffer)
    .resize(SLIDER_IMAGE_WIDTH, SLIDER_IMAGE_HEIGHT, {
      fit: 'cover', // Mantém proporção, corta excesso
      position: 'center', // Centraliza o crop
    })
    .webp({
      quality: 85, // Qualidade 85%
      effort: 4, // Esforço de compressão (0-6, quanto maior mais lento mas menor)
    })
    .toBuffer()

  // Gerar novo filename com extensão .webp
  const filenameWithoutExt = originalFilename.replace(/\.[^/.]+$/, '')
  const newFilename = `${filenameWithoutExt}.webp`

  return {
    buffer: processedBuffer,
    filename: newFilename,
  }
}
