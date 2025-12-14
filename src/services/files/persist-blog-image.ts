import path from 'node:path'
import { BLOG_IMAGES_PATH, BLOG_TEMP_IMAGES_PATH } from '@constants/dynamic-file-constants'
import { logError } from '@lib/logger/helpers/log-error'
import { BLOG_IMAGE_PERSIST_ERROR } from '@messages/loggings/blog-loggings'
import fs from 'fs-extra'

// Função para mover uma imagem do blog da pasta temporária para a pasta definitiva:
export async function persistBlogImage(tempImageName: string) {
  try {
    const oldImagePath = path.resolve(BLOG_TEMP_IMAGES_PATH, tempImageName)

    const newImagePath = path.resolve(BLOG_IMAGES_PATH, tempImageName)

    await fs.ensureDir(BLOG_IMAGES_PATH)

    await fs.move(oldImagePath, newImagePath, { overwrite: false })

    return path.basename(newImagePath)
  } catch (error) {
    logError({ error, message: BLOG_IMAGE_PERSIST_ERROR })

    return null
  }
}
