import type { PresentationType } from '@prisma/generated/enums'

const PRESENTATION_TYPE_LABELS: Record<PresentationType, string> = {
  ORAL: 'Apresentação Oral',
  POSTER: 'Pôster',
}

/**
 * Converte o enum `PresentationType` para seu rótulo legível em português.
 *
 * @param presentationType - Tipo de apresentação acadêmica, ou `null`/`undefined`.
 * @returns Rótulo traduzido (`'Apresentação Oral'` ou `'Pôster'`), ou string vazia se não informado.
 *
 * @example
 * formatPresentationType('ORAL')    // 'Apresentação Oral'
 * formatPresentationType('POSTER')  // 'Pôster'
 * formatPresentationType(null)      // ''
 */
export function formatPresentationType(presentationType: PresentationType | null | undefined): string {
  if (!presentationType) return ''
  return PRESENTATION_TYPE_LABELS[presentationType]
}
