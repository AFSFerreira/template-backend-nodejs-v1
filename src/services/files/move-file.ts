import type { IMoveFile } from '@custom-types/services/files/move-file'
import { logError } from '@lib/logger/helpers/log-error'
import { FILE_PERSIST_ERROR } from '@messages/loggings/system/file-loggings'
import { fileExists } from '@utils/files/file-exists'
import fs from 'fs-extra'

export async function moveFile({ oldFilePath, newFilePath, options }: IMoveFile) {
  try {
    // Verifica se o arquivo antigo existe:
    const oldFilePathExists = fileExists(oldFilePath)
    if (!oldFilePathExists) return options?.ignoreOldFileMissing ? oldFilePath : null

    await fs.move(oldFilePath, newFilePath, { overwrite: options?.overwrite ?? false })

    return newFilePath
  } catch (error) {
    logError({ error, context: { oldFilePath, newFilePath, options }, message: FILE_PERSIST_ERROR })

    return null
  }
}
