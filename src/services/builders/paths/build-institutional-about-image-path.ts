import path from 'node:path'
import {
  INSTITUTIONAL_ABOUT_IMAGES_PATH,
  INSTITUTIONAL_TEMP_ABOUT_IMAGES_PATH,
} from '@constants/dynamic-file-constants'

export function buildInstitutionalTempAboutImagePath(filename: string) {
  return path.resolve(INSTITUTIONAL_TEMP_ABOUT_IMAGES_PATH, filename)
}

export function buildInstitutionalAboutImagePath(filename: string) {
  return path.resolve(INSTITUTIONAL_ABOUT_IMAGES_PATH, filename)
}
