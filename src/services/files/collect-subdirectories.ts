import type { Dirent } from 'node:fs'
import path from 'node:path'
import { logError } from '@lib/pino/helpers/log-error'
import { LISTING_FILES_ERROR } from '@messages/loggings/system/file-loggings'
import { listFiles } from './list-files'

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
