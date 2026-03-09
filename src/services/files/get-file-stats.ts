import fs from 'node:fs/promises'

/**
 * Obtém as estatísticas (metadados) de um arquivo via `fs.stat`.
 *
 * @param filePath - Caminho absoluto do arquivo.
 * @returns Objeto `Stats` com tamanho, datas de criação/modificação, etc.
 */
export async function getFileStats(filePath: string) {
  return await fs.stat(filePath)
}
