import path from 'node:path'

/**
 * Retorna o nome base de um caminho de arquivo, opcionalmente removendo um sufixo.
 *
 * Wrapper sobre `path.basename` para uso consistente no projeto.
 *
 * @param filePath - Caminho completo ou relativo do arquivo.
 * @param suffix - Sufixo a ser removido do nome (ex: `.ts`, `.avif`).
 * @returns Nome base do arquivo.
 *
 * @example
 * getFileBasename('/uploads/blog/imagem.avif')         // 'imagem.avif'
 * getFileBasename('/uploads/blog/imagem.avif', '.avif') // 'imagem'
 */
export function getFileBasename(filePath: string, suffix?: string) {
  return path.basename(filePath, suffix)
}
