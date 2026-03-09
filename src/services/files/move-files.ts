import type { IMoveFile } from '@custom-types/services/files/move-file'
import { moveFile } from './move-file'

/**
 * Move múltiplos arquivos em paralelo via `Promise.allSettled`.
 *
 * @param files - Lista de operações de movimentação (oldFilePath, newFilePath, options).
 * @returns `true` se todos foram movidos, `false` se alguma movimentação falhou.
 */
export async function moveFiles(files: IMoveFile[]) {
  const moveResults = await Promise.allSettled(files.map(async (file) => await moveFile(file)))

  const moveFailures = moveResults.filter((value) => value.status === 'rejected')

  if (moveFailures.length > 0) {
    return false
  }

  return true
}
