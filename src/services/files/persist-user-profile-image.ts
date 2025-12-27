import type { IPersistUserProfileImage } from '@custom-types/services/persist-user-profile-image'
import { logError } from '@lib/logger/helpers/log-error'
import { PROFILE_IMAGE_PERSIST_ERROR } from '@messages/loggings/user-loggings'
import { buildUserProfileImagePath } from '@services/files/build-user-profile-image-path'
import { buildUserTempProfileImagePath } from '@services/files/build-user-temp-profile-image-path'
import fs from 'fs-extra'

// Função para mover a imagem de perfil do usuário da pasta temporária para a pasta definitiva:
export async function persistUserProfileImage({ filename }: IPersistUserProfileImage) {
  try {
    const oldImagePath = buildUserTempProfileImagePath(filename)
    const newImagePath = buildUserProfileImagePath(filename)

    const fileAreadyExists = await fs.exists(newImagePath)

    // O arquivo já foi persistido anteriormente:
    if (fileAreadyExists) return filename

    await fs.move(oldImagePath, newImagePath, { overwrite: false })

    return filename
  } catch (error) {
    logError({ error, message: PROFILE_IMAGE_PERSIST_ERROR })

    return null
  }
}
