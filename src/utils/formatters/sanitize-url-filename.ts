import { extractBaseFilenameFromLink } from '@utils/extractors/extract-base-filename-from-link'
import { isValidUrl } from '@utils/validators/is-valid-url'

/**
 * Normaliza um input que pode ser uma URL completa ou um nome de arquivo simples.
 *
 * Se o input for uma URL válida, extrai apenas o nome base do arquivo.
 * Se for um nome de arquivo simples, retorna como está.
 * Se for `undefined`, retorna `null`.
 *
 * @param input - URL completa ou nome de arquivo.
 * @returns Nome do arquivo extraído, o próprio input se não for URL, ou `null` se vazio.
 *
 * @example
 * sanitizeUrlFilename('https://exemplo.com/uploads/banner.avif') // 'banner.avif'
 * sanitizeUrlFilename('banner.avif')                             // 'banner.avif'
 * sanitizeUrlFilename(undefined)                                 // null
 */
export function sanitizeUrlFilename(input: string | undefined) {
  if (!input) return null
  return isValidUrl(input) ? extractBaseFilenameFromLink(input) : input
}
