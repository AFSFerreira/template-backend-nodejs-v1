const LITERAL_OCCUPATION_PT_OPTIONS = [
  'PESQUISADOR',
  'PROFESSOR',
  'ALUNO',
  'PÓS-GRADUANDO',
  'MESTRANDO',
  'DOUTORANDO',
] as const

const LITERAL_OCCUPATION_EN_OPTIONS = [
  'RESEARCHER',
  'PROFESSOR',
  'STUDENT',
  'POSTGRADUATE',
  'MASTER',
  'DOCTORATE',
] as const

export const ALL_LITERAL_OCCUPATION_OPTIONS = new Set<string>([
  ...LITERAL_OCCUPATION_PT_OPTIONS,
  ...LITERAL_OCCUPATION_EN_OPTIONS,
])

export type LiteralOccupationPtType =
  (typeof LITERAL_OCCUPATION_PT_OPTIONS)[number]
export type LiteralOccupationEnType =
  (typeof LITERAL_OCCUPATION_EN_OPTIONS)[number]
