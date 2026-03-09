import type { CleanupFilesOptions } from '@custom-types/services/files/cleanup-files-options'
import { cleanupFiles } from './cleanup-files'
import { collectSubdirectories } from './collect-subdirectories'

export async function cleanupFilesRecursive(rootPath: string, options?: CleanupFilesOptions) {
  const subdirectories = await collectSubdirectories(rootPath)
  const allPaths = [rootPath, ...subdirectories]

  await Promise.all(allPaths.map((dir) => cleanupFiles(dir, options)))
}
