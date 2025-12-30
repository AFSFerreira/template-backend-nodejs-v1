import path from 'node:path'
import { HOME_PAGE_SLIDER_IMAGES_PATH } from '@constants/dynamic-file-constants'

export function buildHomePageSliderImagePath(filename: string) {
  return path.resolve(HOME_PAGE_SLIDER_IMAGES_PATH, filename)
}
