import type { IPersistSliderImage } from '@custom-types/services/persist-slider-image'
import path from 'node:path'
import { SLIDER_IMAGES_PATH } from '@constants/dynamic-file-constants'
import { logError } from '@lib/logger/helpers/log-error'
import { SLIDER_IMAGE_PERSIST_ERROR } from '@messages/loggings/slider-image-loggings'
import { buildSliderImagePath } from '@services/files/build-slider-image-path'
import { buildTempSliderImagePath } from '@services/files/build-temp-slider-image-path'
import fs from 'fs-extra'

export async function persistSliderImage({ filename, sliderSubfolder }: IPersistSliderImage) {
  try {
    const sliderImagesPath = path.resolve(SLIDER_IMAGES_PATH, sliderSubfolder)

    const oldImagePath = buildTempSliderImagePath(filename)
    const newImagePath = buildSliderImagePath(filename, sliderSubfolder)

    const fileAreadyExists = await fs.exists(newImagePath)

    // O arquivo já foi persistido anteriormente:
    if (fileAreadyExists) return filename

    await fs.ensureDir(sliderImagesPath)

    await fs.move(oldImagePath, newImagePath, { overwrite: false })

    return filename
  } catch (error) {
    logError({ error, message: SLIDER_IMAGE_PERSIST_ERROR })
    return null
  }
}
