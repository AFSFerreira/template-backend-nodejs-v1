import { deleteFile } from './delete-file'

/**
 * Remove múltiplos arquivos em paralelo via `Promise.allSettled`.
 *
 * @param files - Lista de caminhos absolutos dos arquivos a serem removidos.
 * @returns `true` se todos foram removidos, `false` se alguma remoção falhou.
 */
export async function deleteFiles(files: string[]) {
  const deletionResults = await Promise.allSettled(files.map(async (file) => await deleteFile(file)))

  const deletionFailures = deletionResults.filter((value) => value.status === 'rejected')

  if (deletionFailures.length > 0) {
    return false
  }

  return true
}
