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

export function mapEducationLevel(educationLevel: EducationLevelType | null | undefined): string {
  if (!educationLevel) return ''
  return EDUCATION_LEVEL_LABELS[educationLevel]
}
