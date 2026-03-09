import fs from 'fs-extra'

/**
 * Verifica se um arquivo existe no disco (síncrono).
 *
 * @param filename - Caminho absoluto do arquivo.
 * @returns `true` se o arquivo existir.
 */
export function fileExistsSync(filename: string) {
  return fs.existsSync(filename)
}
