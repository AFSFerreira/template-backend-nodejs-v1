import type { IPersistBlogImage } from '@custom-types/services/persist-blog-image'
import path from 'node:path'
import { BLOG_IMAGES_PATH, BLOG_TEMP_IMAGES_PATH } from '@constants/dynamic-file-constants'
import { logError } from '@lib/logger/helpers/log-error'
import { BLOG_IMAGE_PERSIST_ERROR } from '@messages/loggings/blog-loggings'
import fs from 'fs-extra'

// Função para mover uma imagem do blog da pasta temporária para uma pasta definitiva de blogs:
export async function persistBlogImage({ filename }: IPersistBlogImage) {
  try {
    const oldImagePath = path.resolve(BLOG_TEMP_IMAGES_PATH, filename)
    const newImagePath = path.resolve(BLOG_IMAGES_PATH, filename)

    const fileAreadyExists = await fs.exists(newImagePath)

    // O arquivo já foi persistido anteriormente:
    if (fileAreadyExists) return filename

    await fs.move(oldImagePath, newImagePath, { overwrite: false })

    return filename
  } catch (error) {
    logError({ error, message: BLOG_IMAGE_PERSIST_ERROR })

    return null
  }
}
