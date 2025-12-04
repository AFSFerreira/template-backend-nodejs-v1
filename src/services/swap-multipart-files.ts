import { glob } from 'node:fs/promises'
import path from 'node:path'
import type { ISwapMultipartFiles } from '@custom-types/services/swap-multipart-files'
import { logError } from '@lib/logger/helpers/log-error'
import { SWAP_FILE_LOOP_ERROR } from '@messages/loggings'
import { saveMultipartFile } from './save-multipart-file'
import { deleteFile } from '../utils/files/delete-file'

export async function swapMultipartFiles(files: ISwapMultipartFiles[]) {
  for (const file of files) {
    const { anyExtension, ...filteredFileInfo } = file
    const absFileName = await saveMultipartFile(filteredFileInfo)

    if (!absFileName) return false

    if (!file.anyExtension) continue

    // Remove todos os demais arquivos com o mesmo nome, mas com uma extensão diferente:
    try {
      const filePattern = path.join(file.baseFolder, path.parse(file.filename).name + '*')

      const files = await Array.fromAsync(glob(filePattern))

      const deletePromises = files
        .filter((file) => path.resolve(absFileName) !== path.resolve(file))
        .map((file) => deleteFile(file))

      await Promise.all(deletePromises)
    } catch (error) {
      logError({ error, context: { file }, message: SWAP_FILE_LOOP_ERROR })

      return false
    }
  }

  return true
}
