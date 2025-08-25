import type {
  LiteralEducationLevelEnType,
  LiteralEducationLevelPtType,
} from '@custom-types/literal-education-level-type'
import type { TranslationLanguageType } from '@custom-types/translation-language-type'
import { EducationLevelType } from '@prisma/client'

function translateEducationLevelPt(
  educationLevel: EducationLevelType,
): LiteralEducationLevelPtType {
  switch (educationLevel) {
    case EducationLevelType.ELEMENTARY_SCHOOL:
      return 'ENSINO FUNDAMENTAL'
    case EducationLevelType.HIGH_SCHOOL:
      return 'ENSINO MÉDIO'
    case EducationLevelType.UNDERGRADUATE_STUDENT:
      return 'ALUNO DE GRADUAÇÃO'
    case EducationLevelType.BACHELOR:
      return 'BACHAREL'
    case EducationLevelType.MASTER_STUDENT:
      return 'ALUNO DE MESTRADO'
    case EducationLevelType.MASTER:
      return 'MESTRADO'
    case EducationLevelType.DOCTORATE_STUDENT:
      return 'ALUNO DE DOUTORADO'
    case EducationLevelType.DOCTORATE:
      return 'DOUTORADO'
    case EducationLevelType.OTHER:
      return 'OUTRO'
  }
}

function translateEducationLevelEn(
  educationLevel: EducationLevelType,
): LiteralEducationLevelEnType {
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

export function translateEducationLevelToEnumPt(
  educationLevel: LiteralEducationLevelPtType,
): EducationLevelType {
  switch (educationLevel) {
    case 'ENSINO FUNDAMENTAL':
      return EducationLevelType.ELEMENTARY_SCHOOL
    case 'ENSINO MÉDIO':
      return EducationLevelType.HIGH_SCHOOL
    case 'ALUNO DE GRADUAÇÃO':
      return EducationLevelType.UNDERGRADUATE_STUDENT
    case 'BACHAREL':
      return EducationLevelType.BACHELOR
    case 'ALUNO DE DOUTORADO':
      return EducationLevelType.DOCTORATE_STUDENT
    case 'DOUTORADO':
      return EducationLevelType.DOCTORATE
    case 'ALUNO DE MESTRADO':
      return EducationLevelType.MASTER_STUDENT
    case 'MESTRADO':
      return EducationLevelType.MASTER
    case 'OUTRO':
      return EducationLevelType.OTHER
  }
}

export function translateEducationLevelToEnumEn(
  educationLevel: LiteralEducationLevelEnType,
): EducationLevelType {
  switch (educationLevel) {
    case 'ELEMENTARY SCHOOL':
      return EducationLevelType.ELEMENTARY_SCHOOL
    case 'HIGH SCHOOL':
      return EducationLevelType.HIGH_SCHOOL
    case 'UNDERGRADUATE STUDENT':
      return EducationLevelType.UNDERGRADUATE_STUDENT
    case 'BACHELOR':
      return EducationLevelType.BACHELOR
    case 'DOCTORATE STUDENT':
      return EducationLevelType.DOCTORATE_STUDENT
    case 'DOCTORATE':
      return EducationLevelType.DOCTORATE
    case 'MASTER STUDENT':
      return EducationLevelType.MASTER_STUDENT
    case 'MASTER':
      return EducationLevelType.MASTER
    case 'OTHER':
      return EducationLevelType.OTHER
  }
}

export function getTranslatedEducationLevels(
  lang: TranslationLanguageType = 'pt',
) {
  return Object.values(EducationLevelType).map(
    lang === 'en' ? translateEducationLevelEn : translateEducationLevelPt,
  )
}
