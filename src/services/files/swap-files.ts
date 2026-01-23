import type { IswapFiles } from '@custom-types/services/files/swap-multipart-files'
import { glob } from 'node:fs/promises'
import path from 'node:path'
import { logError } from '@lib/logger/helpers/log-error'
import { SWAP_FILE_LOOP_ERROR } from '@messages/loggings/system/file-loggings'
import { deleteFile } from '../../utils/files/delete-file'
import { saveFile } from './save-file'

export async function swapFiles(files: IswapFiles[]) {
  for (const file of files) {
    const { anyExtension, ...filteredFileInfo } = file
    const { filename, finalFilePath, success } = await saveFile({
      ...filteredFileInfo,
      newFilename: file.filename,
    })

    const partialReturnData = { filename, finalFilePath }

    if (!success) return { ...partialReturnData, success: false }

    if (!file.anyExtension) continue

    // Remove todos os demais arquivos com o mesmo nome, mas com uma extensão diferente:
    try {
      const filePattern = path.resolve(file.baseFolder, `${path.parse(file.filename).name}*`)

      const files = await Array.fromAsync(glob(filePattern))

      const deletePromises = files
        .filter((file) => path.resolve(finalFilePath) !== path.resolve(file))
        .map((file) => deleteFile(file))

      await Promise.all(deletePromises)
    } catch (error) {
      logError({ error, context: { file }, message: SWAP_FILE_LOOP_ERROR })

      return false
    }
  }

  return true
}
