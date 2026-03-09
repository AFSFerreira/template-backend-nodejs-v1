import type { CleanupFilesOptions } from '@custom-types/services/files/cleanup-files-options'
import { cleanupFiles } from './cleanup-files'
import { collectSubdirectories } from './collect-subdirectories'

/**
 * Executa limpeza de arquivos expirados recursivamente em um diretório e todos os seus subdiretórios.
 *
 * Utiliza {@link collectSubdirectories} para coletar a árvore de pastas
 * e aplica {@link cleanupFiles} em paralelo em cada uma.
 *
 * @param rootPath - Diretório raiz para início da limpeza recursiva.
 * @param options - Opções de limpeza (TTL, batch size, ignoreFilenames).
 */
export async function cleanupFilesRecursive(rootPath: string, options?: CleanupFilesOptions) {
  const subdirectories = await collectSubdirectories(rootPath)
  const allPaths = [rootPath, ...subdirectories]

  await Promise.all(allPaths.map((dir) => cleanupFiles(dir, options)))
}
