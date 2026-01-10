import type { IMoveFile } from '@custom-types/services/move-file'
import { logError } from '@lib/logger/helpers/log-error'
import { FILE_PERSIST_ERROR } from '@messages/loggings/file-loggings'
import fs from 'fs-extra'
import path from 'node:path'

export async function moveFile({ oldFilePath, newFilePath, options }: IMoveFile) {
  try {
    // Verifica se o arquivo antigo existe:
    const oldFilePathExists = fs.exists(oldFilePath)
    if (!oldFilePathExists) return options?.ignoreOldFileMissing ? oldFilePath : null

    // Verifica se o diretório de destino existe:
    const newBaseFolder = path.dirname(newFilePath)
    const newBaseFolderExists = fs.exists(newBaseFolder)
    if (!newBaseFolderExists) return null

    await fs.move(oldFilePath, newFilePath, { overwrite: options?.overwrite ?? false })

    return newFilePath
  } catch (error) {
    logError({ error, context: { oldFilePath, newFilePath, options }, message: FILE_PERSIST_ERROR })

    return null
  }
}
