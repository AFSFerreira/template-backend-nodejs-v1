import type { IPersistBlogImage } from '@custom-types/services/persist-blog-image'
import { logError } from '@lib/logger/helpers/log-error'
import { BLOG_IMAGE_PERSIST_ERROR } from '@messages/loggings/blog-loggings'
import { buildBlogImagePath } from '@services/files/build-blog-image-path'
import { buildBlogTempImagePath } from '@services/files/build-blog-temp-image-path'
import fs from 'fs-extra'

// Função para mover uma imagem do blog da pasta temporária para uma pasta definitiva de blogs:
export async function persistBlogImage({ filename }: IPersistBlogImage) {
  try {
    const oldImagePath = buildBlogTempImagePath(filename)
    const newImagePath = buildBlogImagePath(filename)

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
