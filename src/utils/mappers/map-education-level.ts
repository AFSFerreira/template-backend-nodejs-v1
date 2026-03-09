import type { EducationLevelType } from '@prisma/generated/enums'

const EDUCATION_LEVEL_LABELS: Record<EducationLevelType, string> = {
  ELEMENTARY_SCHOOL: 'Ensino Fundamental',
  HIGH_SCHOOL: 'Ensino Médio',
  UNDERGRADUATE_STUDENT: 'Estudante de Graduação',
  BACHELOR: 'Graduado',
  MASTER_STUDENT: 'Estudante de Mestrado',
  MASTER: 'Mestre',
  DOCTORATE_STUDENT: 'Estudante de Doutorado',
  DOCTORATE: 'Doutor',
  POST_DOCTORATE_STUDENT: 'Estudante de Pós-Doutorado',
  POST_DOCTORATE: 'Pós-Doutor',
  OTHER: 'Outro',
}

/**
 * Converte o enum `EducationLevelType` para seu rótulo legível em português.
 *
 * @param educationLevel - Nível educacional, ou `null`/`undefined`.
 * @returns Rótulo traduzido (ex: `'Mestre'`, `'Estudante de Doutorado'`), ou string vazia se não informado.
 *
 * @example
 * mapEducationLevel('MASTER')              // 'Mestre'
 * mapEducationLevel('DOCTORATE_STUDENT')   // 'Estudante de Doutorado'
 * mapEducationLevel(null)                  // ''
 */
export function mapEducationLevel(educationLevel: EducationLevelType | null | undefined): string {
  if (!educationLevel) return ''
  return EDUCATION_LEVEL_LABELS[educationLevel]
}
