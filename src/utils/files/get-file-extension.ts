import path from 'node:path'

/**
 * Extrai a extensão de um arquivo a partir do seu nome ou caminho, sem o ponto e em minúsculas.
 *
 * @param file - Nome ou caminho do arquivo.
 * @returns Extensão do arquivo em lowercase, sem o ponto inicial.
 *
 * @example
 * getFileExtension('imagem.AVIF')                    // 'avif'
 * getFileExtension('/uploads/blog/banner.webp')      // 'webp'
 * getFileExtension('documento.PDF')                  // 'pdf'
 * getFileExtension('arquivo-sem-extensao')           // ''
 */
export function getFileExtension(file: string) {
  return path.extname(file).slice(1).toLowerCase()
}
