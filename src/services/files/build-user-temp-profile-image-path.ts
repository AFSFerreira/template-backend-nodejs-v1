import path from 'node:path'
import { REGISTER_TEMP_PROFILE_IMAGES_PATH } from '@constants/dynamic-file-constants'

export function buildUserTempProfileImagePath(filename: string) {
  return path.resolve(REGISTER_TEMP_PROFILE_IMAGES_PATH, filename)
}
