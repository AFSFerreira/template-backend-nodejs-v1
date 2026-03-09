import { EXTENSION_TO_MIME_MAP, MIME_TO_EXTENSION_MAP } from '@constants/maps'

/**
 * Converte um MIME type para sua extensão de arquivo correspondente.
 *
 * Remove parâmetros extras do MIME (como `charset`) antes da busca.
 *
 * @param mimeType - MIME type completo (ex: `'image/avif'`, `'text/html; charset=utf-8'`).
 * @returns Extensão do arquivo (ex: `'avif'`, `'html'`), ou `undefined` se não encontrada.
 *
 * @example
 * mapMimeTypeToExtension('image/avif')                    // 'avif'
 * mapMimeTypeToExtension('application/pdf')               // 'pdf'
 * mapMimeTypeToExtension('text/html; charset=utf-8')      // 'html'
 * mapMimeTypeToExtension('application/x-desconhecido')    // undefined
 */
export function mapMimeTypeToExtension(mimeType: string) {
  const cleanMime = mimeType.split(';')[0].trim().toLowerCase()

  const extension = MIME_TO_EXTENSION_MAP.get(cleanMime)

  return extension
}

/**
 * Converte uma extensão de arquivo para seu MIME type correspondente.
 *
 * @param extension - Extensão do arquivo sem o ponto (ex: `'avif'`, `'pdf'`).
 * @returns MIME type correspondente (ex: `'image/avif'`), ou `undefined` se não encontrado.
 *
 * @example
 * mapExtensionToMimeType('avif') // 'image/avif'
 * mapExtensionToMimeType('pdf')  // 'application/pdf'
 */
export function mapExtensionToMimeType(extension: string) {
  const mimeType = EXTENSION_TO_MIME_MAP.get(extension)

  return mimeType
}
