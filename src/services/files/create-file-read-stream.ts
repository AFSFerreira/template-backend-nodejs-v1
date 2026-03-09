import { logError } from '@lib/pino/helpers/log-error'
import { FILE_STREAM_CREATION_ERROR } from '@messages/loggings/system/file-loggings'
import fs from 'fs-extra'

/**
 * Cria um stream de leitura para um arquivo.
 *
 * @param filename - Caminho absoluto do arquivo.
 * @returns `ReadStream` do arquivo, ou `null` em caso de erro.
 */
export async function createFileReadStream(filename: string) {
  try {
    const fileStream = fs.createReadStream(filename)
    return fileStream
  } catch (error) {
    logError({ error, context: { filename }, message: FILE_STREAM_CREATION_ERROR })
    return null
  }
}
