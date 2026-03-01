import type { OccupationType } from '@prisma/generated/enums'

const OCCUPATION_LABELS: Record<OccupationType, string> = {
  RESEARCHER: 'Pesquisador(a)',
  PROFESSOR: 'Professor(a)',
  STUDENT: 'Estudante',
  POSTGRADUATE: 'Pós-Graduando(a)',
  MASTER: 'Mestrando(a)',
  DOCTORATE: 'Doutorando(a)',
}

export function mapOccupation(occupation: OccupationType | null | undefined): string {
  if (!occupation) return ''
  return OCCUPATION_LABELS[occupation]
}
