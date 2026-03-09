import path from 'node:path'

/**
 * Constrói um caminho de subpasta para sharding de arquivos, usando os 4 primeiros caracteres do nome.
 *
 * Distribui arquivos em subpastas de dois níveis para evitar a concentração excessiva
 * de arquivos em um único diretório, melhorando a performance do sistema de arquivos.
 * A estratégia utiliza os 2 primeiros caracteres como primeiro nível e os caracteres 3-4
 * como segundo nível.
 *
 * @param filename - Nome do arquivo (deve ter pelo menos 4 caracteres).
 * @returns Caminho relativo da subpasta (ex: `ab/cd`), ou string vazia se o nome for inválido.
 *
 * @example
 * buildShardFileFolder('abcdef123.avif') // 'ab/cd'
 * buildShardFileFolder('xy99file.webp')  // 'xy/99'
 * buildShardFileFolder('ab')             // '' (menos de 4 caracteres)
 * buildShardFileFolder('')               // '' (string vazia)
 */
export function buildShardFileFolder(filename: string) {
  if (!filename || filename.length < 4) return ''
  return path.join(filename.slice(0, 2), filename.slice(2, 4))
}
