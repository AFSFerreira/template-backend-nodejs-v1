import type { CleanupFilesOptions } from '@custom-types/services/files/cleanup-files-options'
import path from 'node:path'
import { ERASE_FILES_CONCURRENCY } from '@constants/jobs-configuration-constants'
import { logError } from '@lib/pino/helpers/log-error'
import {
  FILE_LIFETIME_CALCULATION_ERROR,
  FILE_REMOVAL_ERROR,
  LISTING_FILES_ERROR,
} from '@messages/loggings/system/file-loggings'
import ms from 'ms'
import { deleteFile } from './delete-file'
import { getFileAgeInMs } from './get-file-age-in-ms'
import { listFiles } from './list-files'

/**
 * Remove arquivos expirados (baseado em TTL) de um diretório,
 * processando em lotes para controle de concorrência.
 *
 * Ignora arquivos listados em `ignoreFilenames` (padrão: `.gitkeep`).
 * Cada arquivo é verificado individualmente pela idade (birthtime/ctime/mtime).
 *
 * @param folderPath - Diretório-alvo para limpeza.
 * @param options.batchSize - Tamanho do lote de deleções em paralelo (padrão: `ERASE_FILES_CONCURRENCY`).
 * @param options.ttlInMs - Tempo de vida máximo em milissegundos (padrão: 1 dia).
 * @param options.ignoreFilenames - Nomes de arquivos a ignorar (padrão: `['.gitkeep']`).
 * @returns `false` em caso de erro ao listar o diretório.
 */
export async function cleanupFiles(folderPath: string, options: CleanupFilesOptions = {}) {
  const { batchSize = ERASE_FILES_CONCURRENCY, ttlInMs = ms('1d'), ignoreFilenames = ['.gitkeep'] } = options

  let fileNames: string[] | undefined

  const ignoreFilenamesSet = new Set<string>(ignoreFilenames)

  try {
    const entries = await listFiles(folderPath)

    fileNames = entries
      .filter((entry) => {
        const isFile = entry.isFile()
        const validFileName = !ignoreFilenamesSet.has(entry.name)

        return isFile && validFileName
      })
      .map((file) => file.name)
  } catch (error) {
    logError({ error, context: { path: folderPath }, message: LISTING_FILES_ERROR })
    return false
  }

  for (let idx = 0; idx < fileNames.length; idx += batchSize) {
    const deleteBatch = fileNames.slice(idx, idx + batchSize)

    await Promise.all(
      deleteBatch.map(async (filename) => {
        const fullFilePath = path.join(folderPath, filename)

        let fileAgeMs: number | undefined

        try {
          fileAgeMs = await getFileAgeInMs(fullFilePath)
        } catch (error) {
          logError({ error, context: { path: fullFilePath }, message: FILE_LIFETIME_CALCULATION_ERROR })
          return false
        }

        if (fileAgeMs <= ttlInMs) return false

        try {
          await deleteFile(fullFilePath)
        } catch (error) {
          logError({ error, context: { path: fullFilePath }, message: FILE_REMOVAL_ERROR })
          return false
        }

        return true
      }),
    )
  }

  return true
}
