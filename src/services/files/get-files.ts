import { glob } from 'node:fs/promises'
import { logError } from '@lib/logger/helpers/log-error'
import { FILE_RETRIEVAL_ERROR } from '@messages/loggings/file-loggings'

export async function getFiles(filePattern: string) {
  try {
    const files = await Array.fromAsync(glob(filePattern))

    return files
  } catch (error) {
    logError({ error, context: { filePattern }, message: FILE_RETRIEVAL_ERROR })
    return []
  }
}
