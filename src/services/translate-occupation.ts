import type {
  LiteralOccupationEnType,
  LiteralOccupationPtType,
} from '@custom-types/literal-ocupation-type'
import type { TranslationLanguageType } from '@custom-types/translation-language-type'
import { OccupationType } from '@prisma/client'

export function translateOccupationPt(
  occupation: OccupationType,
): LiteralOccupationPtType {
  switch (occupation) {
    case OccupationType.RESEARCHER:
      return 'PESQUISADOR'
    case OccupationType.PROFESSOR:
      return 'PROFESSOR'
    case OccupationType.STUDENT:
      return 'ALUNO'
    case OccupationType.POSTGRADUATE:
      return 'PÓS-GRADUANDO'
    case OccupationType.MASTER:
      return 'MESTRANDO'
    case OccupationType.DOCTORATE:
      return 'DOUTORANDO'
  }
}

export function translateOccupationEn(
  occupation: OccupationType,
): LiteralOccupationEnType {
  switch (occupation) {
    case OccupationType.RESEARCHER:
      return 'RESEARCHER'
    case OccupationType.PROFESSOR:
      return 'PROFESSOR'
    case OccupationType.STUDENT:
      return 'STUDENT'
    case OccupationType.POSTGRADUATE:
      return 'POSTGRADUATE'
    case OccupationType.MASTER:
      return 'MASTER'
    case OccupationType.DOCTORATE:
      return 'DOCTORATE'
  }
}

export function translateOccupationToEnumPt(
  occupation: LiteralOccupationPtType,
): OccupationType {
  switch (occupation) {
    case 'PESQUISADOR':
      return OccupationType.RESEARCHER
    case 'PROFESSOR':
      return OccupationType.PROFESSOR
    case 'ALUNO':
      return OccupationType.STUDENT
    case 'PÓS-GRADUANDO':
      return OccupationType.POSTGRADUATE
    case 'MESTRANDO':
      return OccupationType.MASTER
    case 'DOUTORANDO':
      return OccupationType.DOCTORATE
  }
}

export function translateOccupationToEnumEn(
  occupation: LiteralOccupationEnType,
): OccupationType {
  switch (occupation) {
    case 'RESEARCHER':
      return OccupationType.RESEARCHER
    case 'PROFESSOR':
      return OccupationType.PROFESSOR
    case 'STUDENT':
      return OccupationType.STUDENT
    case 'POSTGRADUATE':
      return OccupationType.POSTGRADUATE
    case 'MASTER':
      return OccupationType.MASTER
    case 'DOCTORATE':
      return OccupationType.DOCTORATE
  }
}

export function getTranslatedOccupations(lang: TranslationLanguageType = 'pt') {
  return Object.values(OccupationType).map(
    lang === 'pt' ? translateOccupationPt : translateOccupationEn,
  )
}
