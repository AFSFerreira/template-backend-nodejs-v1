import type { IPersistBlogBanner } from '@custom-types/services/persist-blog-banner'
import { logError } from '@lib/logger/helpers/log-error'
import { BLOG_BANNER_PERSIST_ERROR } from '@messages/loggings/blog-loggings'
import { buildBlogBannerPath } from '@services/files/build-blog-banner-path'
import { buildBlogTempBannerPath } from '@services/files/build-blog-temp-banner-path'
import fs from 'fs-extra'

// Função para mover o banner do blog da pasta temporária para a pasta definitiva:
export async function persistBlogBanner({ filename }: IPersistBlogBanner) {
  try {
    const oldBannerPath = buildBlogTempBannerPath(filename)
    const newBannerPath = buildBlogBannerPath(filename)

    const fileAreadyExists = await fs.exists(newBannerPath)

    // O arquivo já foi persistido anteriormente:
    if (fileAreadyExists) return filename

    await fs.move(oldBannerPath, newBannerPath, { overwrite: false })

    return filename
  } catch (error) {
    logError({ error, message: BLOG_BANNER_PERSIST_ERROR })

    return null
  }
}
