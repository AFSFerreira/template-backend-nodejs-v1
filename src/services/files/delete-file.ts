import { logError } from '@lib/pino/helpers/log-error'
import { FILE_DELETION_ERROR } from '@messages/loggings/system/file-loggings'
import fs from 'fs-extra'

/**
 * Remove um arquivo do disco de forma segura.
 *
 * @param filePath - Caminho absoluto do arquivo a ser removido.
 * @returns `true` se removido com sucesso, `false` em caso de erro (log registrado).
 */
export async function deleteFile(filePath: string) {
  try {
    await fs.unlink(filePath)
    return true
  } catch (error) {
    logError({ error, context: { filePath }, message: FILE_DELETION_ERROR })
    return false
  }
}
