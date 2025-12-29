import path from 'node:path'
import { REGISTER_PROFILE_IMAGES_PATH, REGISTER_TEMP_PROFILE_IMAGES_PATH } from '@constants/dynamic-file-constants'

export function buildUserTempProfileImagePath(filename: string) {
  return path.resolve(REGISTER_TEMP_PROFILE_IMAGES_PATH, filename)
}

export function buildUserProfileImagePath(filename: string) {
  return path.resolve(REGISTER_PROFILE_IMAGES_PATH, filename)
}
