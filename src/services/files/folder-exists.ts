import fs from 'fs-extra'

/**
 * Verifica se um diretório existe no disco (assíncrono).
 *
 * @param path - Caminho absoluto do diretório.
 * @returns `true` se o diretório existir.
 */
export async function folderExists(path: string) {
  return await fs.exists(path)
}
