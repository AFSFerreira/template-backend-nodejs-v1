import { urlSchema } from '@lib/zod/utils/primitives/url-schema'

/**
 * Valida se uma string é uma URL válida conforme o schema Zod do projeto.
 *
 * @param url - String a ser validada.
 * @returns `true` se a string for uma URL válida.
 *
 * @example
 * isValidUrl('https://exemplo.com/imagem.avif')   // true
 * isValidUrl('texto-qualquer')                    // false
 * isValidUrl('')                                  // false
 */
export function isValidUrl(url: string) {
  return urlSchema.safeParse(url).success
}
