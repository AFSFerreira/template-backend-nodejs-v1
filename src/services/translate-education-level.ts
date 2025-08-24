import type { TranslationLanguageType } from '@custom-types/translation-language-type'
import { EducationLevelType } from '@prisma/client'

function translateEducationalLevelPt(educationLevel: EducationLevelType) {
  switch (educationLevel) {
    case EducationLevelType.ELEMENTARY_SCHOOL:
      return 'ENSINO FUNDAMENTAL'
    case EducationLevelType.HIGH_SCHOOL:
      return 'ENSINO MÉDIO'
    case EducationLevelType.UNDERGRADUATE_STUDENT:
      return 'ALUNO DE GRADUAÇÃO'
    case EducationLevelType.BACHELOR:
      return 'BACHAREL'
    case EducationLevelType.DOCTORATE_STUDENT:
      return 'ALUNO DE DOUTORADO'
    case EducationLevelType.DOCTORATE:
      return 'DOUTORADO'
    case EducationLevelType.MASTER_STUDENT:
      return 'ALUNO DE MESTRADO'
    case EducationLevelType.MASTER:
      return 'MESTRADO'
    case EducationLevelType.OTHER:
      return 'OUTRO'
  }
}

function translateEducationalLevelEn(educationLevel: EducationLevelType) {
  switch (educationLevel) {
    case EducationLevelType.ELEMENTARY_SCHOOL:
      return 'ELEMENTARY SCHOOL'
    case EducationLevelType.HIGH_SCHOOL:
      return 'HIGH SCHOOL'
    case EducationLevelType.UNDERGRADUATE_STUDENT:
      return 'UNDERGRADUATE STUDENT'
    case EducationLevelType.BACHELOR:
      return 'BACHELOR'
    case EducationLevelType.DOCTORATE_STUDENT:
      return 'DOCTORATE STUDENT'
    case EducationLevelType.DOCTORATE:
      return 'DOCTORATE'
    case EducationLevelType.MASTER_STUDENT:
      return 'MASTER STUDENT'
    case EducationLevelType.MASTER:
      return 'MASTER'
    case EducationLevelType.OTHER:
      return 'OTHER'
  }
}

export function getTranslatedEducationLevels(
  lang: TranslationLanguageType = 'pt',
) {
  return Object.values(EducationLevelType).map(
    lang === 'en' ? translateEducationalLevelEn : translateEducationalLevelPt,
  )
}
