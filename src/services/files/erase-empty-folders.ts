import type { CleanFolderOptions } from '@custom-types/services/files/clean-folder-options'
import { promises as fs } from 'node:fs'
import * as path from 'node:path'
import { logError } from '@lib/pino/helpers/log-error'

/**
 * Remove recursivamente diretórios vazios dentro de um diretório-alvo.
 *
 * Percorre a árvore de pastas em profundidade, removendo diretórios
 * que ficam vazios após a limpeza dos filhos. Preserva o diretório raiz
 * e diretórios marcados com `preserveRoot`.
 *
 * @param targetDir - Diretório raiz para início da varredura.
 * @param options.preserveRoot - Se `true`, preserva também subdiretórios raiz.
 * @param isRoot - Controle interno de recursão (não informar manualmente).
 */
export async function eraseEmptyFolders(targetDir: string, options: CleanFolderOptions = {}, isRoot: boolean = true) {
  try {
    const stats = await fs.stat(targetDir)

    if (!stats.isDirectory()) return

    const entries = await fs.readdir(targetDir)

    if (entries.length > 0) {
      await Promise.all(entries.map((entry) => eraseEmptyFolders(path.resolve(targetDir, entry), options, false)))
    }

    const remainingEntries = await fs.readdir(targetDir)

    if (remainingEntries.length === 0) {
      if (isRoot || options.preserveRoot) return

      await fs.rmdir(targetDir)
    }
  } catch (error) {
    logError({
      error,
      context: {
        targetDir,
        options,
        isRoot,
      },
      message: 'Erro ao realizar limpeza de diretórios vazios',
    })
  }
}
