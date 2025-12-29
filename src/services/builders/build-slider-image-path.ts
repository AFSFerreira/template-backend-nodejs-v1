import path from 'node:path'
import { SLIDER_IMAGES_PATH, TEMP_SLIDER_IMAGES_PATH } from '@constants/dynamic-file-constants'

export function buildTempSliderImagePath(filename: string) {
  return path.resolve(TEMP_SLIDER_IMAGES_PATH, filename)
}

export function buildSliderImagePath(filename: string) {
  return path.resolve(SLIDER_IMAGES_PATH, filename)
}
