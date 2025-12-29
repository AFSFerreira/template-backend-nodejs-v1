import type { IPersistFile } from '@custom-types/services/persist-file'
import path from 'node:path'
import { logError } from '@lib/logger/helpers/log-error'
import { FILE_PERSIST_ERROR } from '@messages/loggings/file-loggings'
import fs from 'fs-extra'

export async function persistFile({ oldFilePath, newFilePath, options }: IPersistFile) {
  try {
    // Verifica se o arquivo antigo existe:
    const oldFilePathExists = fs.exists(oldFilePath)
    if (!oldFilePathExists) return options?.ignoreOldFileMissing ? oldFilePath : null

    // Verifica se o diretório de destino existe:
    const newBaseFolder = path.dirname(newFilePath)
    const newBaseFolderExists = fs.exists(newBaseFolder)
    if (!newBaseFolderExists) return null

    // Verifica se arquivo já foi persistido anteriormente:
    const fileAreadyExists = await fs.exists(newFilePath)
    if (fileAreadyExists) return options?.ignoreNewFileAlreadyExists ? newFilePath : null

    await fs.move(oldFilePath, newFilePath, { overwrite: options?.overwrite ?? false })

    return newFilePath
  } catch (error) {
    logError({ error, message: FILE_PERSIST_ERROR })

    return null
  }
}
