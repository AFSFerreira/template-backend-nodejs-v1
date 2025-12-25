import type { DimensionsType, IMapQualityToDimensions } from '@custom-types/utils/mappers/map-quality-to-dimensions'

export function mapQualityToDimensions({ aspectRatio, quality }: IMapQualityToDimensions): DimensionsType {
  switch (aspectRatio) {
    case '16:9':
      switch (quality) {
        case 'nHD':
          return { width: 640, height: 360 }
        case 'HD':
          return { width: 1280, height: 720 }
        case 'FULL_HD':
          return { width: 1920, height: 1080 }
        case 'QUAD_HD':
          return { width: 2560, height: 1440 }
        case 'UHD':
          return { width: 3840, height: 2160 }
        case '8K_UHD':
          return { width: 7680, height: 4320 }
        default:
          return { width: 1920, height: 1080 }
      }

    case '9:16':
      switch (quality) {
        case 'nHD':
          return { width: 360, height: 640 }
        case 'HD':
          return { width: 720, height: 1280 }
        case 'FULL_HD':
          return { width: 1080, height: 1920 }
        case 'QUAD_HD':
          return { width: 1440, height: 2560 }
        case 'UHD':
          return { width: 2160, height: 3840 }
        case '8K_UHD':
          return { width: 4320, height: 7680 }
        default:
          return { width: 1080, height: 1920 }
      }

    case '21:9':
      switch (quality) {
        case 'nHD':
          return { width: 2560, height: 1080 }
        case 'HD':
          return { width: 3440, height: 1440 }
        case 'FULL_HD':
          return { width: 5120, height: 2160 }
        case 'QUAD_HD':
          return { width: 5120, height: 2160 }
        case 'UHD':
          return { width: 5120, height: 2160 }
        case '8K_UHD':
          return { width: 5120, height: 2160 }
        default:
          return { width: 3440, height: 1440 }
      }

    case '4:3':
      switch (quality) {
        case 'nHD':
          return { width: 640, height: 480 }
        case 'HD':
          return { width: 800, height: 600 }
        case 'FULL_HD':
          return { width: 1024, height: 768 }
        case 'QUAD_HD':
          return { width: 2048, height: 1536 }
        case 'UHD':
          return { width: 2048, height: 1536 }
        case '8K_UHD':
          return { width: 2048, height: 1536 }
        default:
          return { width: 1024, height: 768 }
      }

    case '1:1':
      switch (quality) {
        case 'nHD':
          return { width: 500, height: 500 }
        case 'HD':
          return { width: 1080, height: 1080 }
        case 'FULL_HD':
          return { width: 1080, height: 1080 }
        case 'QUAD_HD':
          return { width: 2160, height: 2160 }
        case 'UHD':
          return { width: 2160, height: 2160 }
        case '8K_UHD':
          return { width: 2160, height: 2160 }
        default:
          return { width: 1080, height: 1080 }
      }

    case '3:2':
      switch (quality) {
        case 'nHD':
          return { width: 1080, height: 720 }
        case 'HD':
          return { width: 2160, height: 1440 }
        case 'FULL_HD':
          return { width: 3000, height: 2000 }
        case 'QUAD_HD':
          return { width: 3000, height: 2000 }
        case 'UHD':
          return { width: 3000, height: 2000 }
        case '8K_UHD':
          return { width: 3000, height: 2000 }
        default:
          return { width: 2160, height: 1440 }
      }

    default:
      return { width: 1920, height: 1080 }
  }
}
