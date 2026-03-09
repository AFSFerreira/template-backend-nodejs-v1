import fs from 'fs-extra'

/**
 * Lê o conteúdo completo de um arquivo como string UTF-8.
 *
 * @param absolutePath - Caminho absoluto do arquivo.
 * @returns Conteúdo do arquivo, ou `null` se não for possível ler.
 */
export async function readFile(absolutePath: string): Promise<string | null> {
  try {
    const content = await fs.readFile(absolutePath, 'utf-8')
    return content
  } catch {
    return null
  }
}
