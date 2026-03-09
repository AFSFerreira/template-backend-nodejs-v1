import type { OccupationType } from '@prisma/generated/enums'

const OCCUPATION_LABELS: Record<OccupationType, string> = {
  RESEARCHER: 'Pesquisador(a)',
  PROFESSOR: 'Professor(a)',
  STUDENT: 'Estudante',
  POSTGRADUATE: 'Pós-Graduando(a)',
  MASTER: 'Mestrando(a)',
  DOCTORATE: 'Doutorando(a)',
}

/**
 * Converte o enum `OccupationType` para seu rótulo legível em português.
 *
 * @param occupation - Ocupação profissional, ou `null`/`undefined`.
 * @returns Rótulo traduzido com gênero neutro (ex: `'Pesquisador(a)'`), ou string vazia se não informado.
 *
 * @example
 * mapOccupation('RESEARCHER')  // 'Pesquisador(a)'
 * mapOccupation('STUDENT')     // 'Estudante'
 * mapOccupation(null)          // ''
 */
export function mapOccupation(occupation: OccupationType | null | undefined): string {
  if (!occupation) return ''
  return OCCUPATION_LABELS[occupation]
}
