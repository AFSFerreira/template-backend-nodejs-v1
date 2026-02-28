import type { IGetProseMirrorText } from '@custom-types/services/extractors/get-prose-mirror-text'
import { generateText } from '@tiptap/core'

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
