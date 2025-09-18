import path from 'node:path'
import { REGISTER_PROFILE_IMAGES_PATH, REGISTER_TEMP_PROFILE_IMAGES_PATH } from '@constants/file-constants'
import fs from 'fs-extra'

export async function persistUserProfileImage(tempImageName: string) {
  const oldImagePath = path.resolve(REGISTER_TEMP_PROFILE_IMAGES_PATH, tempImageName)

  const newImagePath = path.resolve(REGISTER_PROFILE_IMAGES_PATH, tempImageName)

  await fs.move(oldImagePath, newImagePath, { overwrite: false })
}
