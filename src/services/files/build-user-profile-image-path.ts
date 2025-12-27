import path from 'node:path'
import { REGISTER_PROFILE_IMAGES_PATH } from '@constants/dynamic-file-constants'

export function buildUserProfileImagePath(filename: string) {
  return path.resolve(REGISTER_PROFILE_IMAGES_PATH, filename)
}
