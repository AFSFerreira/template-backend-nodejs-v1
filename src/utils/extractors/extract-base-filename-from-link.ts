import path from 'node:path'
import { logError } from '@lib/pino/helpers/log-error'
import { INVALID_URL_FALLBACK } from '@messages/loggings/system/file-loggings'

/**
 * Extrai o nome base do arquivo a partir de uma URL completa.
 *
 * Faz o parsing da URL e retorna apenas o último segmento do pathname,
 * ignorando query strings e fragmentos. Em caso de URL inválida, loga o erro
 * e retorna `null` em vez de lançar exceção.
 *
 * @param link - URL completa contendo o caminho do arquivo.
 * @returns Nome base do arquivo (ex: `imagem.avif`) ou `null` se a URL for inválida.
 *
 * @example
 * extractBaseFilenameFromLink('https://exemplo.com/uploads/blog/imagem.avif') // 'imagem.avif'
 * extractBaseFilenameFromLink('https://exemplo.com/path/to/doc.pdf?v=2')      // 'doc.pdf'
 * extractBaseFilenameFromLink('url-invalida')                                 // null
 */
export function extractBaseFilenameFromLink(link: string): string | null {
  try {
    const urlObj = new URL(link)
    return path.posix.basename(urlObj.pathname)
  } catch (error) {
    logError({ error, message: INVALID_URL_FALLBACK })
    return null
  }
}
