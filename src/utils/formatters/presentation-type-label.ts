import type { PresentationType } from '@prisma/generated/enums'

const PRESENTATION_TYPE_LABELS: Record<PresentationType, string> = {
  ORAL: 'Apresentação Oral',
  POSTER: 'Pôster',
}

export function formatPresentationType(presentationType: PresentationType | null | undefined): string {
  if (!presentationType) return ''
  return PRESENTATION_TYPE_LABELS[presentationType]
}
