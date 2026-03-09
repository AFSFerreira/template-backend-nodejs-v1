import fs from 'fs-extra'

/**
 * Cria um stream de escrita para um arquivo.
 *
 * @param filename - Caminho absoluto do arquivo de destino.
 * @returns `WriteStream` para o arquivo.
 */
export async function CreateFileWriteSteam(filename: string) {
  return fs.createWriteStream(filename)
}
