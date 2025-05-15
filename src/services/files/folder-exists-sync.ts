import fs from 'fs-extra'

/**
 * Garante que um diretório exista, criando-o recursivamente se necessário (síncrono).
 *
 * @param path - Caminho absoluto do diretório.
 */
export function folderExistsSync(path: string) {
  return fs.ensureDir(path)
}
