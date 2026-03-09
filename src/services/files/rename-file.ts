import { logError } from '@lib/pino/helpers/log-error'
import { FILE_RENAME_ERROR } from '@messages/loggings/system/file-loggings'
import fs from 'fs-extra'

/**
 * Renomeia (ou move) um arquivo de forma segura.
 *
 * @param oldPath - Caminho atual do arquivo.
 * @param newPath - Novo caminho/nome do arquivo.
 * @returns `true` se renomeado com sucesso, `false` em caso de erro.
 */
export async function renameFile(oldPath: string, newPath: string): Promise<boolean> {
  try {
    await fs.rename(oldPath, newPath)
    return true
  } catch (error) {
    logError({ error, context: { oldPath, newPath }, message: FILE_RENAME_ERROR })
    return false
  }
}
