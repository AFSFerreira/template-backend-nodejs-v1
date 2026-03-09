import type { IGetProseMirrorText } from '@custom-types/services/extractors/get-prose-mirror-text'
import { generateText } from '@tiptap/core'

/**
 * Extrai texto plano de um documento ProseMirror (TipTap) com limite de caracteres.
 *
 * Converte o JSON do ProseMirror em texto puro utilizando a configuração de extensões
 * do TipTap. O texto resultante é truncado de forma inteligente no último espaço antes
 * do limite, evitando cortar palavras no meio.
 *
 * @param params - Parâmetros de extração.
 * @param params.proseMirror - Documento ProseMirror no formato JSON.
 * @param params.tiptapConfiguration - Configuração de extensões do TipTap para parsing.
 * @param params.limit - Limite máximo de caracteres (padrão: 600).
 * @returns Texto extraído e opcionalmente truncado, ou `null` se ocorrer erro no parsing.
 *
 * @example
 * getProseMirrorText({ proseMirror: doc, tiptapConfiguration: extensions })
 * // 'Texto extraído do documento...'
 *
 * getProseMirrorText({ proseMirror: doc, tiptapConfiguration: extensions, limit: 100 })
 * // Texto truncado em até 100 caracteres no último espaço
 */
export function getProseMirrorText({ proseMirror, tiptapConfiguration, limit }: IGetProseMirrorText) {
  const textLimit = limit ?? 600

  try {
    const extractedText = generateText(proseMirror, tiptapConfiguration, { blockSeparator: '\n' }).trim()

    if (extractedText.length <= textLimit) return extractedText

    const rawSlicedText = extractedText.slice(0, textLimit)

    const lastSpaceIndex = rawSlicedText.lastIndexOf(' ')

    const slicedText = lastSpaceIndex > 0 ? rawSlicedText.slice(0, lastSpaceIndex) : rawSlicedText

    return slicedText
  } catch (_error) {
    return null
  }
}
