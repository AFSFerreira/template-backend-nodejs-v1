import path from 'node:path'
import {
  HOME_PAGE_SLIDER_IMAGES_PATH,
  SLIDER_IMAGES_PATH,
  SLIDER_TEMP_IMAGES_PATH,
} from '@constants/dynamic-file-constants'

export function buildTempSliderImagePath(filename: string) {
  return path.resolve(SLIDER_TEMP_IMAGES_PATH, filename)
}

export function buildSliderImagePath(filename: string) {
  return path.resolve(SLIDER_IMAGES_PATH, filename)
}

export function buildHomePageSliderImagePath(filename: string) {
  return path.resolve(HOME_PAGE_SLIDER_IMAGES_PATH, filename)
}
