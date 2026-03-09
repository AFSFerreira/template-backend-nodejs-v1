import { glob } from 'node:fs/promises'
import { logError } from '@lib/pino/helpers/log-error'
import { FILE_RETRIEVAL_ERROR } from '@messages/loggings/system/file-loggings'

/**
 * Busca arquivos no disco usando um padrão glob.
 *
 * @param filePattern - Padrão glob para busca (e.g., `/path/*.jpg`).
 * @returns Lista de caminhos absolutos encontrados, ou array vazio em caso de erro.
 */
export async function getFiles(filePattern: string) {
  try {
    const files = await Array.fromAsync(glob(filePattern))

    return files
  } catch (error) {
    logError({ error, context: { filePattern }, message: FILE_RETRIEVAL_ERROR })
    return []
  }
}
