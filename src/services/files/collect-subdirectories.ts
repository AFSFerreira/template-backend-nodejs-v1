import type { Dirent } from 'node:fs'
import path from 'node:path'
import { logError } from '@lib/pino/helpers/log-error'
import { LISTING_FILES_ERROR } from '@messages/loggings/system/file-loggings'
import { listFiles } from './list-files'

/**
 * Coleta recursivamente todos os subdiretórios dentro de um caminho raiz.
 *
 * Retorna uma lista plana com os caminhos absolutos de todos os diretórios
 * encontrados em qualquer nível de profundidade.
 *
 * @param rootPath - Diretório raiz para início da coleta.
 * @returns Lista de caminhos absolutos dos subdiretórios.
 */
export async function collectSubdirectories(rootPath: string): Promise<string[]> {
  const dirs: string[] = []

  let entries: Dirent[]

  try {
    entries = await listFiles(rootPath)
  } catch (error) {
    logError({ error, context: { path: rootPath }, message: LISTING_FILES_ERROR })
    return dirs
  }

  for (const entry of entries) {
    if (entry.isDirectory()) {
      const fullDirPath = path.join(rootPath, entry.name)
      dirs.push(fullDirPath)

      const nested = await collectSubdirectories(fullDirPath)

      dirs.push(...nested)
    }
  }

  return dirs
}
