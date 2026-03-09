import fs from 'fs-extra'

/**
 * Verifica se um arquivo existe no disco (assíncrono).
 *
 * @param filename - Caminho absoluto do arquivo.
 * @returns `true` se o arquivo existir.
 */
export async function fileExists(filename: string) {
  return await fs.exists(filename)
}
