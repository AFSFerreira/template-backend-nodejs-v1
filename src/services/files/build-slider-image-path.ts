import path from 'node:path'
import { SLIDER_IMAGES_PATH } from '@constants/dynamic-file-constants'

export function buildSliderImagePath(filename: string, subfolder?: string) {
  const base = subfolder ? path.resolve(SLIDER_IMAGES_PATH, subfolder) : SLIDER_IMAGES_PATH
  return path.resolve(base, filename)
}
