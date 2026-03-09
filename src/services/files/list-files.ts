import fs from 'node:fs/promises'

/**
 * Lista as entradas (arquivos e diretórios) de um diretório com `Dirent` objects.
 *
 * @param dir - Caminho absoluto do diretório.
 * @returns Lista de `Dirent` com nomes e tipos das entradas.
 */
export async function listFiles(dir: string) {
  return await fs.readdir(dir, { withFileTypes: true })
}
