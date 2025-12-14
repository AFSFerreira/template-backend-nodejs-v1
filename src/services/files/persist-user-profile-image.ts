import path from 'node:path'
import { REGISTER_PROFILE_IMAGES_PATH, REGISTER_TEMP_PROFILE_IMAGES_PATH } from '@constants/dynamic-file-constants'
import { logError } from '@lib/logger/helpers/log-error'
import { PROFILE_IMAGE_PERSIST_ERROR } from '@messages/loggings/user-loggings'
import fs from 'fs-extra'

// Função para mover a imagem de perfil do usuário da pasta temporária para a pasta definitiva:
export async function persistUserProfileImage(tempImageName: string) {
  try {
    const oldImagePath = path.resolve(REGISTER_TEMP_PROFILE_IMAGES_PATH, tempImageName)

    const newImagePath = path.resolve(REGISTER_PROFILE_IMAGES_PATH, tempImageName)

    await fs.ensureDir(REGISTER_PROFILE_IMAGES_PATH)

    await fs.move(oldImagePath, newImagePath, { overwrite: false })

    return path.basename(newImagePath)
  } catch (error) {
    logError({ error, message: PROFILE_IMAGE_PERSIST_ERROR })

    return null
  }
}
